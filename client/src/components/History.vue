<template>
  <div id="app">
    <div class="container">
      <br><br><br>
      <div class="row">
        <div class="col s12 m12" v-for='todo in allHistory' style="margin-bottom:50px;">
          <div class="card blue-grey darken-1">
            <div class="card-image">
              <a class="btn-floating halfway-fab waves-effect grey darken-4 red" @click='updateUndone(todo._id)'><i class="material-icons">check</i></a>
            </div>
            <div class="card-content">
              <p>{{ todo.activity }}</p>
            </div>
            <hr>
          </div>
        </div>
        <div class="">
          <h1 v-if='allHistory== null'> Data is Empty !</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidenav from '@/components/sidenav.vue'
import axios from 'axios'

export default{
  created(){
    if (!localStorage.hasOwnProperty('authorization')) {
      window.location.replace('/');
    }
    this.getHistory()
  },
  data(){
    return {
      allHistory: null
    }
  },
  components: {
    sidenav
  },
  methods: {
    getHistory(){
      const token = localStorage.getItem('authorization')
      axios({
        method: 'post',
        url: 'http://localhost:3000/todo/history',
        data: {token}
      })
      .then(dataTodo => {
        this.allHistory = dataTodo.data
      })
      .catch(err => {
        console.log(err);
      })
    },

    updateUndone(id){
        axios({
          method: 'put',
          url: 'http://localhost:3000/todo/history',
          data: {id}
        })
        .then(success => {
          swal({
            title: "Yosh!",
            text: "todo unchecked",
            icon: "success",
          });
          this.getHistory()
        })
        .catch(err => {
          console.log(err);
        })

    }

  }
}
</script>

<style scoped>
  .container{
    padding-left: 220px;
    width: 1000px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: black;
  }
</style>
