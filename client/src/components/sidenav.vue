<template lang="html">
    <div class="nav">
      <h1>ToDo.</h1>
      <br>
      <br>
      <hr>
      <div class="input-field col s6">
        <i class="material-icons prefix">search</i>
        <input id="icon_prefix" type="text" class="validate">
        <label for="icon_prefix">Search</label>
      </div>
      <hr>
      <a class="waves-effect waves-light btn-large" style="width:95%" @click='showAll'>Show All Todo</a>
      <br>
      <a class="waves-effect waves-light btn-large" style="width:95% ;margin-top:5px;" @click='historyPage'>History</a>
      <br>
      <div class="" style=" margin-top: 50%;">
        <hr>
        <a class="waves-effect waves-light btn-large" style="width:95%;" @click='logoutUser'>Logout</a>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    showAll(){
      this.$router.push('/todo')
    },
    logoutUser(){
      swal("Are you sure?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          localStorage.removeItem('authorization');
          this.$router.push('/')
          location.reload();
        }
      })
    },
    historyPage(){
      this.$router.push('/history')
    }
  }
}
</script>

<style>
.nav {
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}

.sidenav a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    margin-left: 200px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
