<template>
  <el-container direction="vertical">
    <el-main>
      <app-header>
        <template slot="header-left">
          <span
            v-loading="loading"
            element-loading-background="rgba(245,245,245,0.7)"
            element-loading-spinner="el-icon-loading">Dokumenti</span>
        </template>
        <template slot="header-center">
          <el-select
            v-model="selectedOptions"
            multiple
            filterable
            default-first-option
            placeholder="Iskanje dokumentov"
            clearable
            style="width: 450px;"
            @change="filterChange"
            @focus="getDocOptions">
            <el-option
              v-for="(option, index) in avaliableOptions"
              :key="index"
              :label="option.text"
              :value="option.id.toUpperCase()"
              :disabled="loading"> <!-- Disable click to atributes until new ones are loaded -->
            </el-option>
          </el-select>
        </template>
        <template slot="header-right">
          <!-- TODO: qqfile - API change to docfile? -->
          <el-upload
            :action="this.$publicPath + 'ajax/dokumenti'"
            :multiple="false"
            :show-file-list="false"
            :on-error="statusCodeError"
            :on-success="fileUploadResponse"
            class="upload-demo"
            name="docfile">
            <el-button
              type="primary"
              plain
              icon="el-icon- mdi mdi-file-document-box-plus-outline">
              Naloži dokument</el-button>
          </el-upload>
        </template>
      </app-header>
      <el-table
        ref="docTable"
        :data="listData"
        height="100%"
        style="width: 100%"
        row-key="DT_RowId"
        highlight-current-row
        @cell-mouse-enter="handleCellMouseEnter"
        @row-dblclick="docDownload">
        <el-table-column
          v-for="(col, index) in columnsProp"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :width-min="col.widthMin"
          show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          label="Opravila"
          width="120">
          <template slot-scope>
            <el-button
              type="text"
              title="Uredi"
              @click="dialogEditVisible = true"><i class="el-icon-edit"/></el-button>
            <el-button
              type="text"
              title="Prenesi"
              @click="docDownload"><i class="el-icon-download"/></el-button>
            <el-button
              type="text"
              title="izbriši"
              @click="docDelete"><i
                style="color: #F56C6C"
                class="el-icon-delete"/></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      :visible.sync="dialogEditVisible"
      title="Urejenje"
      @open="docSetAttr">
      <span>Dokument ID: {{ cellMouseEnterData.DT_RowId }}</span>
      <el-select
        v-model="selectedOptions"
        multiple
        filterable
        default-first-option
        placeholder="Dodaj atribute..."
        clearable
        style="width: 100%"
        @change="filterChange"
        @focus="getDocOptions">
        <el-option
          v-for="(option, index) in avaliableOptions"
          :key="index"
          :label="option.text"
          :value="option.id.toUpperCase()"
          :disabled="loading"/>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="docDelete">Izbriši</el-button>
        <el-button
          plain
          type="primary"
          icon="el-icon-download"
          @click="docDownload">Prenesi</el-button>
        <el-button
          plain
          @click="dialogEditVisible = false">Prekliči</el-button>
        <el-button
          plain
          type="success"
          @click="postDocEdit(docEditQuerry)">Shrani</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
// TODO: https://github.com/ElemeFE/vue-infinite-scroll + http://element.eleme.io/#/en-US/component/table#table-slot
import AppHeader from '@/components/AppHeader'

export default {
  name: 'DokumentiDomov',
  components: {
    AppHeader
  },
  data () {
    return {
      // Table
      drawCount: 0,
      loading: false,
      selectedOptions: [], // Selected filter atributes. Example: ['L:ANHO', 'S:GP', 'T:GD']
      columnsProp: [
        { label: 'ID', prop: 'DT_RowId', width: '100' },
        { label: 'Lokacija', prop: 'attr_lokacija', width: '70' },
        { label: 'Skupina', prop: 'attr_skupina', widthMin: '150' },
        { label: 'Vsebina', prop: 'attr_vsebina', widthMin: '150' },
        { label: 'Tip', prop: 'attr_tip', widthMin: '130' },
        { label: 'Posodobljeno', prop: 'last_update_timestamp', width: '130' },
        { label: 'Posodobil', prop: 'last_update_user', width: '130' },
        { label: 'Ustvarjeno', prop: 'insert_timestamp', width: '130' }
      ],
      cellMouseEnterData: [],
      // Edit
      dialogEditVisible: false,
      docLastUploadedId: ''
    }
  },
  computed: {
    dataTablesQuerry () {
      var q = {
        draw: this.drawCount,
        // MANUALLY ADDED SORTING
        //  TODO: add sorting information to columnsProp, for example: "order: 0, dir: 'desc'"
        //    order > sorting priority number
        //    dir > sort direction
        //    Then insert it to this object like we did it manually below:
        'columns[6][data]': 'last_update_timestamp',
        'order[0][column]': 6,
        'order[0][dir]': 'desc',
        q: this.selectedOptions,
        start: 0, // offset
        length: 40, // limit
        list: true
      }
      return q
    },
    docOptionsQuerry () {
      var q = {
        editMode: this.dialogEditVisible,
        q: this.selectedOptions
      }
      return q
    },
    docEditQuerry () {
      var q = {
        id_dok: this.cellMouseEnterData.DT_RowId,
        atributi: this.selectedOptions
      }
      if (this.selectedOptions.length === 0) { // if all attributes are cleared, we have to send empty 'atributi', otherwise attributes will not be cleared from document
        q['atributi'] = [null]
      }
      return q
    },
    docUploadQuerry () {
      var q = {
        id_dok: this.docLastUploadedId,
        atributi: this.selectedOptions
      }
      if (this.selectedOptions.length === 0) { // if all attributes are cleared, we have to send empty 'atributi', otherwise attributes will not be cleared from document
        q['atributi'] = [null]
      }
      return q
    },
    docDeleteQuerry () {
      var q = {
        id_dok: this.cellMouseEnterData.DT_RowId,
        method: 'delete'
      }
      return q
    },
    avaliableOptions () {
      return this.$store.state.dokumenti.avaliableOptions
    },
    listData () {
      return this.$store.state.dokumenti.list.data
    }
  },
  created () {
    this.getDoc()
    this.getDocOptions()
  },
  methods: {
    // Options filter
    filterChange () {
      this.getDoc()
      this.getDocOptions()
    },
    // AJAX
    getDoc () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$store.dispatch('getDoc', this.dataTablesQuerry)
          .then(() => {
            this.loading = false
            this.drawCount++
            resolve()
          })
      })
    },
    getDocOptions () {
      this.loading = true
      this.$store.dispatch('getDocOptions', this.docOptionsQuerry)
        .then(() => {
          this.loading = false
        })
    },
    docDelete () {
      this.$confirm('Dokument ID: ' + this.docDeleteQuerry.id_dok + ' bo izbrisan. Nadaljujem?', 'Opozorilo', {
        confirmButtonText: 'Potrdi',
        cancelButtonText: 'Prekliči',
        type: 'warning'
      }).then(() => {
        this.postDocDelete()
      }).catch(() => {
        this.$message({
          message: 'Brisanje preklicano!',
          type: 'info'
        })
      })
    },
    postDocDelete () {
      this.loading = true
      var that = this
      this.$store.dispatch('postDocEdit', this.docDeleteQuerry)
        .then((response) => {
          if (!response.data.success) {
            that.$message({
              message: 'Brisanje ni uspelo! Napaka: ' + response.data.error,
              type: 'error'
            })
          } else if (response.data.success) {
            that.$message({
              message: 'Dokument izbrisan! ID: ' + that.docDeleteQuerry.id_dok,
              type: 'success'
            })
            that.getDoc()
            that.dialogEditVisible = false
          }
        })
    },
    postDocEdit (querry) {
      this.loading = true
      var that = this
      this.$store.dispatch('postDocEdit', querry)
        .then((response) => {
          if (!response.data.success) {
            that.$message({
              message: 'Ni uspelo! Napaka: ' + response.data.error,
              type: 'error'
            })
          } else if (response.data.success) {
            that.$message({
              message: 'Sprememba shranjena! ID: ' + response.data.id_dok,
              type: 'success'
            })
            that.getDoc()
            that.dialogEditVisible = false
          }
        })
    },
    docSetAttr () {
      if (this.cellMouseEnterData.attr.length !== 0) {
        this.selectedOptions = this.cellMouseEnterData.attr.split(',')
      }
    },
    docDownload (data) {
      window.open(this.$publicPath + 'dokumenti/' + this.cellMouseEnterData.DT_RowId, '_tab')
    },
    setCurrent (row) {
      this.$refs.docTable.setCurrentRow(this.listData[0])
    },
    statusCodeError (err, file) { // TODO: check how to treat errors with HTTP status codes, more user frendly response
      this.$notify({
        title: 'Napaka ' + err.status,
        message: 'Datoteka ' + file.name + ' ni bila naložena!',
        type: 'error'
      })
    },
    // File Upload
    fileUploadResponse (response) {
      if (response.success) {
        this.docLastUploadedId = response.id_dok
        this.$message({
          message: 'Dokument shranjen! ID: ' + response.id_dok,
          type: 'success'
        })
        if (this.selectedOptions.length !== 0) {
          this.postDocEdit(this.docUploadQuerry)
        }
        this.getDoc().then(() => {
          this.setCurrent(response.id_dok)
        })
      } else {
        this.$message({
          message: 'Dokument ni shranjen! Napaka: ' + response.error,
          type: 'error'
        })
      }
    },
    // Edit DOC
    handleCellMouseEnter (cellMouseEnterData) {
      this.cellMouseEnterData = cellMouseEnterData
    }
  }
}
</script>

<style scoped>
.el-main {
  height: 100%;
  padding: 0px 20px;
  /* overflow: hidden; */
}
td {
  padding: 2px 0;
}
</style>

<style lang="scss">
.el-dialog {
  width: 100%;
  max-width: 600px;
}
</style>
