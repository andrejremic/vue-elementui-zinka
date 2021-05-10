<template>
  <div class="ticket-log-wrapper">
    <div
      id="ticket-log"
      class="ticket-log">
      <v-timeline dense>
        <template v-for="log in ticketLog">
          <v-timeline-item
            v-if="log.tip.tip_id===19"
            :key="log.ticket_log_id"
            large>
            <template v-slot:icon>
              <!-- <div>JS</div> -->
              <v-avatar>
                <img src="http://i.pravatar.cc/64">
              </v-avatar>
            </template>
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix">
                <span><strong>{{ log.oseba.ime + ' ' + log.oseba.priimek }}</strong></span>
                <span style="padding: 0px 10px;"><small>{{ zDistanceInWordsToNowStrict(log.ustvarjen) }}</small></span>
              </div>
              <div>
                {{ log.komentar }}
              </div>
            </el-card>
          </v-timeline-item>
          <v-timeline-item
            v-if="log.tip.tip_id===16"
            :key="log.ticket_log_id"
            icon="mdi-clipboard-check"
            color="#008080"
            large>
            <el-card
              :body-style="{ padding: '0px' }"
              class="box-card">
              <div style="background-color: #008080;">
                <span style="color: #fff; padding: 20px 20px">Nova naloga za <strong>{{ log.oseba_dva.ime + ' ' + log.oseba_dva.priimek }}</strong></span>
              </div>
              <div
                slot="header"
                class="clearfix">
                <span><strong>{{ log.oseba.ime + ' ' + log.oseba.priimek }}</strong></span>
                <span style="padding: 0px 10px;"><small>{{ zDistanceInWordsToNowStrict(log.ustvarjen) }}</small></span>
              </div>
              <div style="padding: 20px;">
                {{ log.komentar }}
              </div>
            </el-card>
          </v-timeline-item>
          <v-timeline-item
            v-if="log.tip.tip_id===26"
            :key="log.ticket_log_id"
            icon="mdi-account-plus"
            color="#909399"
            small
            fill-dot>
            <el-row>
              <span><i>{{ log.oseba.ime + ' ' + log.oseba.priimek }}</i> je dodal osebo <strong>{{ log.oseba_dva.ime + ' ' + log.oseba_dva.priimek }}</strong></span>
              <span style="padding: 0px 10px;"><small>{{ zDistanceInWordsToNowStrict(log.ustvarjen) }}</small></span>
            </el-row>
          </v-timeline-item>
          <v-timeline-item
            v-if="log.tip.tip_id===15"
            :key="log.ticket_log_id"
            icon="mdi-state-machine"
            color="#008080"
            small
            fill-dot>
            <el-row>
              <el-tag>
                <strong>{{ log.status.naziv }}</strong>
              </el-tag>
              <span style="padding: 0px 10px;"><small>{{ zDistanceInWordsToNowStrict(log.ustvarjen) }}</small></span>
            </el-row>
          </v-timeline-item>
          <v-timeline-item
            v-if="log.tip.tip_id===18"
            :key="log.ticket_log_id"
            icon="mdi-account-switch"
            color="#E6A23C"
            small
            fill-dot>
            <el-row>
              <span><i>{{ log.oseba.ime + ' ' + log.oseba.priimek }}</i> je predal tiket na: <strong>{{ log.oseba_dva.ime + ' ' + log.oseba_dva.priimek }}</strong></span>
              <span style="padding: 0px 10px;"><small>{{ zDistanceInWordsToNowStrict(log.ustvarjen) }}</small></span>
            </el-row>
          </v-timeline-item>
        </template>
      </v-timeline>
    </div>
    <div
      :style="styleTicketLogAdd"
      class="ticket-log-add">
      <el-input
        v-model="logRecordForm.inputKomentar"
        resize="none"
        type="textarea"
        placeholder="Napiši komentar..."
        suffix-icon="el-icon-date"
        clearable/>
      <div class="ticket-log-add-bottom">
        <div class="ticket-log-add-bottom-left">
          <el-button
            type="text"
            class="larger"
            icon="el-icon- mdi mdi-clipboard-check"
            @click="addUnit"/>
          <el-dropdown
            placement="top-start"
            trigger="click">
            <el-button
              type="text"
              class="larger el-dropdown-link"
              icon="el-icon- mdi mdi-dots-horizontal"
              @click="addUnit"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Dodaj nalogo</el-dropdown-item>
              <el-dropdown-item>Dodaj sodelujočega</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="ticket-log-add-bottom-right">
          <el-button
            icon="el-icon-s-promotion"
            @click="addLogRecord(logRecordForAPI)"/>
        </div>
      </div>
      <!-- <el-form
        ref="logRecordForm"
        :model="logRecordForm">
        <el-tabs
          v-model="tipNaziv"
          type="border-card">
          <el-tab-pane name="komentar">
            <span slot="label"><i class="el-icon-s-comment"/></span>
            <el-form-item prop="inputKomentar">
              <el-input
                v-model="logRecordForm.inputKomentar"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="Napiši komentar..."
                clearable/>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="sodelujoc">
            <span slot="label"><i class="el-icon-user-solid"/></span>
            <el-form-item prop="inputOseba2">
              <el-select
                v-model="logRecordForm.inputOseba2"
                :remote-method="remoteMethod"
                remote
                value-key="oseba_id"
                filterable
                clearable
                no-data-text="Ni podatkov..."
                placeholder="Dodaj osebo"
                @focus="atFocus('oseba')">
                <el-option
                  v-for="(item) in logRecordForm.inputOseba2Suggestions.oseba"
                  :key="item.oseba_id"
                  :label="item.priimek"
                  :value="item"
                  :disabled="logRecordForm.inputOseba2Loading">
                  <span style="float: left">{{ item.ime }} {{ item.priimek }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="inputKomentarSodelujoc">
              <el-input
                v-model="logRecordForm.inputKomentarSodelujoc"
                :autosize="{ minRows: 1, maxRows: 2}"
                type="textarea"
                placeholder="Opis njegove vloge..."
                clearable/>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="todo">
            <span slot="label"><i class="el-icon-check"/></span>
            <el-form-item prop="inputKomentarTodo">
              <el-input
                v-model="logRecordForm.inputKomentarTodo"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="Opiši kaj je za narediti..."
                clearable/>
            </el-form-item>
          </el-tab-pane>
          <div class="ticket-log-add-bottom">
            <span class="ticket-log-add-bottom-right">
              <el-button
                icon="el-icon-s-promotion"
                @click="addLogRecord(logRecordForAPI)"/>
            </span>
          </div>
        </el-tabs>
      </el-form> -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import { format, isToday } from 'date-fns'
import slLocale from 'date-fns/locale/sl'

export default {
  name: 'TicketLog',
  data () {
    return {
      styleTicketLogAdd: {
        height: '90px'
      },
      ticketLog: [
        {
          ticket_log_id: 1,
          tip: {
            tip_id: 15,
            naziv: 'status'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: null,
            ime: null,
            priimek: null
          },
          ustvarjen: '2019-09-19 15:10:01.353318+02',
          komentar: '',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 1,
          tip: {
            tip_id: 18,
            naziv: 'status'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: 4,
            ime: 'Rožle',
            priimek: 'Novak'
          },
          ustvarjen: '2019-09-19 15:10:01.353318+02',
          komentar: 'Vzpostavitev mikrovalovne zveze.',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 1,
          tip: {
            tip_id: 19,
            naziv: 'komentar'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Jože',
            priimek: 'Sosedov'
          },
          oseba_dva: {
            oseba_id: null,
            ime: null,
            priimek: null
          },
          ustvarjen: '2019-10-17 15:10:01.353318+02',
          komentar: 'Tralala. hopsasa.',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 1,
          tip: {
            tip_id: 19,
            naziv: 'komentar'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: null,
            ime: null,
            priimek: null
          },
          ustvarjen: '2019-10-19 15:10:01.353318+02',
          komentar: 'To pa je komentar. Vzpostavitev mikrovalovne zveze.',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 1,
          icon: 'mdi-book-variant',
          tip: {
            tip_id: 26,
            naziv: 'sodelujoc'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: 6,
            ime: 'Tone',
            priimek: 'Balone'
          },
          ustvarjen: '2019-06-19 15:10:01.353318+02',
          komentar: '',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 1,
          tip: {
            tip_id: 15,
            naziv: 'status'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: null,
            ime: null,
            priimek: null
          },
          ustvarjen: '2019-09-19 15:10:01.353318+02',
          komentar: 'Vzpostavitev mikrovalovne zveze.',
          potrjen: true,
          nad_ticket_log_id: null,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 2,
          tip: {
            tip_id: 18,
            naziv: 'predaja'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: 5,
            ime: 'Nina',
            priimek: 'Mojstrica'
          },
          ustvarjen: '2019-09-19 16:10:01.353318+02',
          komentar: null,
          potrjen: false,
          nad_ticket_log_id: 1,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        },
        {
          ticket_log_id: 2,
          tip: {
            tip_id: 16,
            naziv: 'todo'
          },
          oseba: {
            oseba_id: 4,
            ime: 'Kekec',
            priimek: 'Novak'
          },
          oseba_dva: {
            oseba_id: 5,
            ime: 'Nina',
            priimek: 'Mojstrica'
          },
          ustvarjen: '2019-09-19 16:10:01.353318+02',
          komentar: 'Ja treba bo nekaj narediti!',
          potrjen: false,
          nad_ticket_log_id: 1,
          status: {
            status_id: 11,
            naziv: 'odprto'
          }
        }
      ],
      logRecordForm: {
        inputKomentar: '',
        inputKomentarSodelujoc: '',
        inputKomentarTodo: '',
        inputOseba2: {},
        inputOseba2Suggestions: [],
        inputOseba2Loading: false
      },
      tipNaziv: 'komentar',
      tipIdKeymap: {
        status: 15,
        todo: 16,
        potrditev: 17,
        predaja: 18,
        komentar: 19,
        sodelujoc: 26
      },
      statusIdKeymap: {
        11: 'odprto',
        12: 'planirano',
        13: 'poročilo',
        14: 'opravljeno',
        19: 'zaključeno',
        21: 'odprto',
        22: 'v izvajanju',
        23: 'rešeno',
        24: 'ni bil problem',
        25: 'se rešuje v drugem ticketu',
        26: 'se ne da rešit',
        29: 'zaključeno',
        31: 'poročilo',
        39: 'zaključeno'
      }
    }
  },
  computed: {
    ...mapState('ticket', {
      isLoadingTicketData: state => state.isLoadingTicketData,
      selectedTicketData: state => state.selectedTicketData,
      formFocusElement: state => state.dialog.formFocusElement
    }),
    ...mapState({
      userAA: state => state.userAA
    }),
    ...mapGetters('ticket', [
      'formDataForAPI'
    ]),
    ticketLogCount () {
      return this.selectedTicketData.ticket_log.length
    },
    logRecordForAPI () {
      let out = []
      let logRecord = {}
      logRecord.ticket_id = this.selectedTicketData.ticket_id
      logRecord.oseba_id = this.userAA.uid
      logRecord.tip_id = this.tipIdKeymap[this.tipNaziv]
      switch (this.tipNaziv) {
        // case 'status':
        //   break
        case 'todo':
          logRecord.potrjen = false
          logRecord.komentar = this.logRecordForm.inputKomentarTodo
          break
        // case 'potrditev':
        //   break
        // case 'predaja':
        //   break
        case 'komentar':
          logRecord.komentar = this.logRecordForm.inputKomentar
          break
        case 'sodelujoc':
          logRecord.oseba_dva_id = this.logRecordForm.inputOseba2.oseba_id
          logRecord.komentar = this.logRecordForm.inputKomentarSodelujoc
          break
      }
      out.push(logRecord)
      return out
    }
  },
  watch: { // TODO: check if still needed
    ticketLogCount: function () {
      this.$nextTick(function () {
        this.scrollToEnd('#ticket-log')
      })
    }
  },
  updated () {
    this.scrollToEnd('#ticket-log')
  },
  mounted () {
    this.scrollToEnd('#ticket-log')
  },
  methods: {
    ...mapMutations('ticket', [
      'updateSelectedTicketData',
      'updateFormFocusElement'
    ]),
    ...mapActions('ticket', [
      'getTicketData',
      'putTicketLog'
    ]),
    ...mapActions([
      'find'
    ]),
    addLogRecord (logRecord) {
      this.putTicketLog(logRecord).then(() => {
        this.getTicketData(this.selectedTicketData.ticket_id)
        this.resetForm('logRecordForm')
      })
    },
    atFocus (focusElement) {
      this.updateFormFocusElement(focusElement)
      this.remoteMethod()
    },
    remoteMethod (querry) {
      this.logRecordForm.inputOseba2Loading = true
      this.find({
        qstr: querry,
        search_in: [this.formFocusElement],
        filter_by: this.formDataForAPI
      }).then((response) => {
        this.logRecordForm.inputOseba2Suggestions = response
        this.logRecordForm.inputOseba2Loading = false
      }).catch(() => {
        this.logRecordForm.inputOseba2Loading = false
      })
    },
    zDistanceInWordsToNowStrict (payload) { // TODO: use as mixin
      let time
      if (isToday(payload)) {
        time = format(payload, 'H:mm')
      } else {
        time = format(payload, 'D. M. YYYY', { locale: slLocale })
      }
      return time
    },
    scrollToEnd (querySelector) { // TODO: use as mixin, if it will be used multiple times
      let ticketlog = this.$el.querySelector(querySelector)
      ticketlog.scrollTop = ticketlog.scrollHeight
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.ticket-log-wrapper {
  height: calc(100% - 55px); // 55px = 40px (el-tabs-header height) + 15px (margin-bottom)
  // background-color: rgba(21, 255, 0, 0.418);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .ticket-log {
    // display: flex;
    // flex-direction: column;
    // align-items: stretch;
    overflow-y: auto; // ticket-log will overflow so you can scroll it
    // border-right: 1px solid #DCDFE6;
    // ul {
    //   padding-left: 15px;
    //   padding-right: 10px;
    //   padding-top: 10px;
    //   margin-top: auto;
    // }
  }
  .ticket-log-add {
    height: $--ticket-log-add-height;
    // background-color: whitesmoke;
    padding: 4px;
    overflow-y: none;

    .ticket-log-add-bottom {
      height: 40px;
      display: flex;
      justify-content: space-between;
      padding: 5px 0px;
      // border-bottom: solid 1px #e6e6e6;

      .ticket-log-add-bottom-left {
        min-width: 170px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        > :first-child {
          margin-right: 15px;
        }
      }

      .ticket-log-add-bottom-center {
        justify-content: flex-start;
        align-items: center;
        display: flex;
        > :first-child {
          margin-right: 15px;
        }
      }

      .ticket-log-add-bottom-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > :first-child {
          margin-right: 0px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-timeline.el-timeline--bottomup {
  display: flex;
  flex-direction: column-reverse;
  .el-timeline-item:last-child .el-timeline-item__tail {
    display: block !important;
  }
  .el-timeline-item:first-child .el-timeline-item__tail {
    display: none !important;
  }
}
</style>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .el-card__header {
    padding: 4px 20px !important;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
