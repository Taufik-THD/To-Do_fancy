<template>
  <div class="">
    <sidenav />
    <history />
  </div>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
import history from '@/components/History.vue'

export default {
  name: 'History',
  components: {
    sidenav,
    history
  }
}
</script>
