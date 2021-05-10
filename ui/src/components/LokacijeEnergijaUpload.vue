<template>
  <el-upload
    :action="this.$publicPath + 'ajax/elen/meritve'"
    :multiple="false"
    :show-file-list="false"
    :on-error="statusCodeError"
    :on-success="fileUploadResponse"
    class="upload-demo"
    accept=".xlsx"
    name="xlsxfile">
    <el-button
      type="primary"
      plain
      icon="el-icon-upload2">Naloži meritev</el-button>
    <el-dialog
      :visible.sync="dialogFileUpload"
      title="Potrebna je potrditev sprememb!"
      width="600px">
      <div class="h2">{{ meritev.lok }}, {{ meritev.date }}</div>
      <div v-if="meritev.izvajalec">Pomeril:{{ meritev.izvajalec }}</div>
      <div
        v-for="row in meritev.rows"
        :key="row.row_number">
        <el-alert
          v-if="row.warning"
          :title="row.row_number + ': ' + row.warning"
          :closable="false"
          type="warning"
          show-icon/>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFileUpload = false">Prekliči</el-button>
        <el-button
          type="primary"
          @click="confirmFile">Potrdi</el-button>
      </span>
    </el-dialog>
  </el-upload>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LokacijeEnergijaUpload',
  data () {
    return {
      dialogFileUpload: false,
      dataReady: false,
      meritev: Object
    }
  },
  methods: {
    statusCodeError (err, file) { // TODO: check how to treat errors with HTTP status codes, more user frendly response
      this.$notify({
        title: 'Napaka ' + err.status,
        message: 'Datoteka ' + file.name + ' ni bila naložena!',
        type: 'error'
      })
    },
    fileUploadResponse (response) { // TODO: diferent response notif regarding msg
      if (!response.success) {
        this.$notify({
          title: 'Popravi in ponovno naloži!',
          message: response.error,
          duration: 0,
          type: 'error'
        })
      } else {
        var hasWarning = response.meritev.rows.find(o => o.warning)
        if (hasWarning) {
          this.dialogFileUpload = response.success
          this.meritev = response.meritev
        } else {
          this.confirmFile()
        }
      }
    },
    confirmFile () {
      this.dialogFileUpload = false
      var that = this
      axios.post(this.$publicPath + 'ajax/elen/meritve/potrdi', {}, { // eslint-disable-line no-undef
        timeout: 2000 })
        .then(function (response) {
          if (!response.data.success) {
            that.$notify({
              title: 'Potrditev sprememb ni bila uspešna!',
              duration: 0,
              type: 'error'
            })
          } else if (response.data.success) {
            that.$notify({
              title: 'OK',
              message: 'Meritev je bila uspešno shranjena!',
              type: 'success'
            })
            that.updateSelectedLocationObj()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
