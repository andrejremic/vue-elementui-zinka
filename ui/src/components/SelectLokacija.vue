<template>
  <!-- added @change="$emit('input', selected) to be able to use v-model in parent component to pass selected values to parent component" -->
  <el-select
    v-model="selected"
    :remote-method="remoteMethod"
    :loading="loading"
    filterable
    remote
    clearable
    reserve-keyword
    placeholder="Poišči lokacijo..."
    no-data-text="Ni podatkov..."
    @change="fwSelected">
    <el-option
      v-for="item in options"
      :key="item.lokacija_id"
      :label="item.oznaka"
      :value="item.lokacija_id">
      <div style="float: left">{{ item.ime }}</div>
      <div
        v-if="item.oznaka !== item.ime"
        style="float: right; color: #8492a6; font-size: 13px; padding-right: 14px">{{ item.oznaka }}</div>
    </el-option>
  </el-select>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'SelectLokacija',
  props: {
    preSelected: {
      type: Object,
      required: false,
      default () {
        return {}
      },
      // value is here to be able to use v-model in parent component
      value: {
        type: Number
      }
    }
  },
  data () {
    return {
      options: [],
      selected: this.value,
      loading: false
    }
  },
  mounted () {
    this.remoteMethod()
    this.pushSelected(this.preSelected)
  },
  methods: {
    ...mapActions([
      'suggest'
    ]),
    fwSelected () {
      this.$emit('input', this.selected) // to be able to use v-model in parent component to pass selected values to parent component"
    },
    remoteMethod (querry) {
      this.loading = true
      this.suggest({
        qstr: querry,
        apiUrl: '/lokacija/suggest'
      }).then((response) => {
        this.loading = false
        console.log(response)
        this.options = response
      }).catch(() => {
        this.loading = false
      })
    },
    pushSelected (payload) {
      if (payload) {
        var index = this.options.findIndex(obj => obj.lokacija_id === payload.lokacija_id)
        if (index === -1) {
          this.options.push(payload)
        }
        // this.value = this.preSelected.map(obj => obj.lokacija_id)
        this.selected = payload.lokacija_id
        this.fwSelected()
      }
    }
  }
}
</script>
