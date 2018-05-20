<template>
  <div id="app">
    <div class="container">
      <br><br><br>
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">textsms</i>
            <input type="text" id="autocomplete-input" class="autocomplete" v-on:keyup.enter="addTodo($event)" v-model="newToDo"/>
            <label for="autocomplete-input">Add New To Do</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m12" v-for='todo in allTodo' style="margin-bottom:50px;">
          <div class="card blue-grey darken-1">
            <div class="card-image">
              <a class="btn-floating halfway-fab waves-effect grey darken-4 red" @click='updateDone(todo._id)'><i class="material-icons">check</i></a>
            </div>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" @click="deleteTodo(todo._id)">delete</i></a>
            <div class="card-content">
              <p>{{ todo.activity }}</p>
            </div>
          </div>
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
    this.getTodo()
  },
  data(){
    return {
      newToDo: '',
      allTodo: null,
      dayToDo: null
    }
  },
  components: {
    sidenav
  },
  methods: {
    addTodo(event){
      event.preventDefault()

      const token = localStorage.getItem('authorization')

      const todo  = {
        activity: this.newToDo,
        token
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/todo/add',
        data: todo
      })
      .then(() => {
        this.newToDo = ''
        swal({
          title: "Yosh!",
          text: "Successfully add ToDo",
          icon: "success",
        });
        this.getTodo()
      })
      .catch(err => {
        console.log(err);
      })
    },

    getTodo(){
      const token = localStorage.getItem('authorization')
      axios({
        method: 'post',
        url: 'http://localhost:3000/todo',
        data: {token}
      })
      .then(dataTodo => {
        this.allTodo = dataTodo.data
      })
      .catch(err => {
        console.log(err);
      })
    },

    // todayTodo(){
    //   const token = localStorage.getItem('authorization')
    //
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:9000/todo/today',
    //     data: {token}
    //   })
    //   .then(dataTodo => {
    //     this.dayToDo = dataTodo.data
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //
    // }

    updateDone(id){
      let myVal = setInterval(() => {
        axios({
          method: 'put',
          url: 'http://localhost:3000/todo',
          data: {id}
        })
        .then(success => {
          clearInterval(myVal)
          this.getTodo()
        })
        .catch(err => {
          console.log(err);
        })

      }, 800)

    },

    deleteTodo(id){

      swal("Are you sure?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          axios({
            method: "delete",
            url: `http://localhost:3000/todo/${id}`
          })
          .then(success => {
            swal({
              title: "",
              text: "Successfully delete ToDo",
              icon: "success",
            });
            this.getTodo()
          })
        } else {
          location.reload();
        }
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
