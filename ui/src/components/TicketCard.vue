<template>
  <el-table
    ref="ticketTable"
    :show-header="false"
    :data="table.data.list"
    :current-row-key="currentRowKey"
    row-key="ticket_id"
    highlight-current-row
    @current-change="updateCurrentRow"
    @cell-dblclick="clickEditTicket()">
    <el-table-column>
      <template slot-scope="scope">
        <div class="tc">
          <el-row
            :gutter="10"
            class="tc-main">
            <el-col
              :span="5"
              class="tc-main-left">
              <div class="tc-lok-oznaka">{{ scope.row.lokacija ? scope.row.lokacija.oznaka : "?" }}</div>
              <div class="tc-lok-ime">{{ scope.row.lokacija ? scope.row.lokacija.ime : "?" }}</div>
              <div class="tc-status">{{ scope.row.last_status.naziv }}</div>
              <div class="tc-id">#{{ scope.row.ticket_id }}</div>
            </el-col>
            <el-col
              :span="15"
              class="tc-main-right">
              <el-row>
                <div class="tc-naslov">{{ scope.row.naslov }}</div>
              </el-row>
              <el-row>
                <div class="tc-services">
                  <el-tag
                    v-for="unit in scope.row.unit_lokacija"
                    :key="unit.unit_lokacija_id"
                    type="info"
                    effect="plain"> {{ unit.oznaka }} </el-tag>
                </div>
              </el-row>
              <el-row>
                <div class="tc-units">
                  <el-tag
                    v-for="unit in scope.row.servis_lokacija"
                    :key="unit.servis_lokacija_id"
                    type="danger"
                    effect="dark"> {{ unit.ime }} </el-tag>
                </div>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="tc-bottom">
            <el-col
              :span="5"
              class="bottom-col">
              <div
                class="bottom-element">
                <el-button
                  type="text"
                  title="Uredi"
                  @click.stop="clickEditTicket(scope.row)"><i class="el-icon-edit"/>
                </el-button>
                <el-button
                  type="text"
                  title="izbriši"
                  @click.once.stop="deleteTicket(scope.row)"><i
                    style="color: #F56C6C"
                    class="el-icon-delete"/>
                </el-button>
              </div>
            </el-col>
            <el-col
              :span="4"
              class="bottom-col">
              <div><small>Nosilec</small></div>
              <div class="bottom-element">{{ scope.row.oseba_ime }} {{ scope.row.oseba_priimek }}</div>
            </el-col>
            <el-col
              v-if="notEmptyArrayMixin(scope.row.sodelujoc)"
              :span="4"
              class="bottom-col">
              <div><small>Sodelujoči</small></div>
              <div class="bottom-element">
                <ticket-osebe :sodelujoc="scope.row.sodelujoc"/>
                <!-- <span
                  v-for="(item, index) in scope.row.sodelujoc"
                  :key="index">{{ item.ime }} {{ item.priimek }}<span v-if="(index!=(scope.row.sodelujoc.length-1))">, </span>
                </span> -->
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { notEmptyArrayMixin } from '@/mixins/notEmptyArray'
import TicketOsebe from '@/components/TicketOsebe'

export default {
  name: 'TicketCard',
  components: {
    TicketOsebe
  },
  mixins: [notEmptyArrayMixin],
  computed: {
    ...mapState('ticket', {
      loading: state => state.loading,
      table: state => state.table,
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
    ...mapMutations('ticket', [
      'editTicket',
      'updateCurrentRowKey',
      'updateCurrentRowData'
    ]),
    ...mapActions('ticket', [
      'getTicketTable',
      'getTicketData',
      'deleteTicket'
    ]),
    updateCurrentRow (payload) {
      if (payload) {
        this.updateCurrentRowData(payload)
        this.updateCurrentRowKey(payload.ticket_id)
        this.getTicketData(payload.ticket_id)
      }
    },
    clickEditTicket (rowData) {
      this.editTicket({ visible: true, ticketId: rowData.ticket_id })
      this.updateCurrentRowKey(rowData.ticket_id)
    }
  }
}
</script>
<style lang="scss" scoped>
.tc {
  background-color: #fff;
  border: solid 1px #DCDFE6;
  border-radius: 10px;
  .tc-main {
    padding-top: 4px;
    > .tc-main-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      > .tc-lok-oznaka {
        font-size: medium;
        font-weight: 600
      }
      > .tc-lok-ime {
        line-height: 10px;
      }
      > .tc-status {
        width: 100%;
        text-align: center;
        color: white;
        font-weight: 800;
        text-transform: uppercase;
        margin: 2px 0 2px 0;
        background-color: rgb(0, 9, 134);
        border: solid 1px rgba(80, 80, 80, 0.356);
        border-left: solid 0px;
        border-radius: 0 5px 5px 0;
      }
      > .tc-id {
        line-height: 10px;
      }
    }
    > .tc-main-right {
      .el-tag {
       margin-right: 1px;
      }
      .tc-naslov {
        font-size: medium;
        font-weight: 600
      }
    }
  }
  .tc-bottom {
    // background-color: #DCDFE6;
    // TODO: na novo z flex
    .bottom-col {
      height: 36px;
    }
    .bottom-element {
      position: absolute;
      bottom: 0%;
    }
  }
}
.el-table {
  width: 100%;
  min-width: 402px;
  height:100%;
  overflow-y: scroll;
  background-color: transparent;
}
</style>
<style lang="css">
.el-table tr {
  background-color: transparent !important;
}
.el-table td {
  border-bottom: solid 0px transparent !important;
  padding: 2px 0 !important;
}
</style>
