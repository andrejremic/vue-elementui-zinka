<template>
  <div>
    <div
      v-for="oseba in sodelujocPotrjen"
      :key="oseba.oseba_id"
      class="ticket-oseba-list">
      <el-dropdown
        size="mini"
        placement="right-end"
        @command="confirmSodeujoc">
        <span class="el-dropdown-link">{{ res(oseba.ime) + ' ' + res(oseba.priimek) + ' - ' + res(map.skupina[oseba.skupina_id]) }}
          <!-- <i
            v-if="oseba.potrjen===true"
            class="el-icon-check"/> -->
          <i
            v-if="oseba.potrjen===null"
            class="el-icon-question"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :command="{ 'oseba': oseba, 'potrjen': true}"
            icon="el-icon-check">Potrdi</el-dropdown-item>
          <el-dropdown-item
            :command="{ 'oseba': oseba, 'potrjen': false}"
            icon="el-icon-close">Zavrni</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TicketOsebe',
  props: {
    sodelujoc: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      checkList: []
    }
  },
  computed: {
    ...mapState('ticket', {
      selectedTicketData: state => state.selectedTicketData,
      map: state => state.map
    }),
    ...mapState({
      userAA: state => state.userAA
    }),
    sodelujocPotrjen () {
      let list = this.sodelujoc.filter(obj => !(obj.potrjen === false))
      return list
    }
  },
  methods: {
    ...mapActions('ticket', [
      'getTicketData',
      'putTicketLog'
    ]),
    confirmSodeujoc (payload) {
      let out = []
      let logRecord = {}
      logRecord.ticket_id = this.selectedTicketData.ticket_id
      logRecord.nad_ticket_log_id = payload.oseba.ticket_log_id
      logRecord.oseba_id = this.userAA.uid
      logRecord.tip_id = 17
      logRecord.potrjen = payload.potrjen
      out.push(logRecord)
      this.putTicketLog(out).then(() => {
        this.getTicketData(this.selectedTicketData.ticket_id)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  font-size: $--font-size-small;
}
</style>
