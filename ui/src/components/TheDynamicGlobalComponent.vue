<template>
  <component
    :is="globalComponent.name"
    v-bind="globalComponent.props"/>
</template>

<script>
import { mapState } from 'vuex'
import TicketEdit from '@/components/TicketEdit'

export default {
  name: 'TheDynamicGlobalComponent',
  components: {
    TicketEdit
  },
  computed: {
    ...mapState({
      globalComponent: state => state.globalComponent
    })
  }
}
</script>
