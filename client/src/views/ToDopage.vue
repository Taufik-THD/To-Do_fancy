<template>
  <div class="">
    <sidenav />
    <todo />
  </div>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
import todo from '@/components/ToDopage.vue'

export default {
  name: 'todopage',
  components: {
    sidenav,
    todo
  }
}
</script>
