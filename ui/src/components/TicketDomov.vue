<template>
  <el-container direction="horizontal">
    <el-main>
      <el-container direction="vertical">
        <app-header>
          <template slot="header-left">
            <div
              v-loading="loading"
              element-loading-background="rgba(245,245,245,0.7)"
              element-loading-spinner="el-icon-loading"><h2>Dnevnik</h2></div>
            <div class="filter">
              <select-lokacija/>
              <select-lokacija/>
            </div>
          </template>
          <template slot="header-center"/>
          <template slot="header-right">
            <el-dropdown
              placement="top-start"
              trigger="click"
              @command="addTicket">
              <el-button
                type="text"
                class="xx-large el-dropdown-link"
                icon="el-icon- mdi mdi-plus"
                @click="addUnit"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="opravilo">Dodaj opravilo</el-dropdown-item>
                <el-dropdown-item command="dogodek">Dodaj dogodek</el-dropdown-item>
                <el-dropdown-item command="zapis">Dodaj zapis</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </app-header>
        <ticket-card/>
      </el-container>
    </el-main>
    <ticket-view/>
    <!-- <el-container
        v-if="table.data"
        direction="horizontal">
      <el-aside
        v-if="currentRowKey"
        width="450px">
        <ticket-log v-if="!isLoadingTicketData"/>
        <z-loading v-else/>
      </el-aside>
      </el-container> -->
    <!-- <ticket-edit :key="editTicketId"/> -->
  </el-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import AppHeader from '@/components/AppHeader'
import TicketLog from '@/components/TicketLog'
import TicketCard from '@/components/TicketCard'
import TicketEdit from '@/components/TicketEdit'
import SelectLokacija from '@/components/SelectLokacija'
import TicketView from '@/components/TicketView'

export default {
  name: 'TicketDomov',
  components: {
    AppHeader,
    TicketView,
    SelectLokacija,
    TicketEdit,
    TicketLog,
    TicketCard
  },
  computed: {
    ...mapState('ticket', {
      editTicketId: state => state.dialog.ticketId,
      loading: state => state.loading,
      table: state => state.table,
      isLoadingTicketData: state => state.isLoadingTicketData,
      currentRowKey: state => state.table.currentRowKey
    })
    // dataTablesQuerry () {
    //   var q = {
    //     table_properties: {
    //       draw: this.table.drawCount,
    //       start: 0, // offset
    //       length: 40 // limit
    //     }
    //   }
    //   return q
    // }
  },
  created () {
    this.getTicketTable()
  },
  methods: {
    ...mapMutations([
      'setGlobalComponent'
    ]),
    ...mapMutations('ticket', [
      'editTicket'
    ]),
    ...mapActions('ticket', [
      'getTicketTable'
    ]),
    addTicket () {
      // this.editTicket({ visible: true, ticketId: null })
      this.setGlobalComponent({
        name: 'TicketEdit',
        props: {
          visible: true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  height: calc(100% - #{$--main-header-height});
  > .el-main {
    height: 100%;;
    > .el-container {
      height: 100%;
      > .ticket-card {
      height: calc(100% - #{$--app-header-height});
      }
    }
  }
}
</style>
<style lang="scss">
.filter .el-input {
  width: 150px;
}
.filter :first-child {
  margin-right: 5px;
}
</style>
