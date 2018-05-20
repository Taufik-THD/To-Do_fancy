<template>
  <div class="body-background">
    <h1 style="padding-left:20px;">
      <span style="color:white;">ToDo</span>
      <span style="color:dodgerblue; font-size:25px;"></span>
    </h1>
    <br><br><br>
    <div class="row center">
      <h4 style="color:white;">Quote Today</h4>
      <h5 class="header center teal-text text-lighten-5"><i>" {{ quote.quote }} "</i></h5>
      <br>
      <button class="waves-effect waves-light btn modal-trigger" data-target="modal1">GETTING STARTED
        <i class="material-icons right">send</i>
      </button>
    </div>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="container white z-depth-2">
      	<ul class="tabs teal">
      		<li class="tab col s3"><a class="white-text active" href="#login" @click='resetForm'>login</a></li>
      		<li class="tab col s3"><a class="white-text" href="#register" @click='resetForm'>register</a></li>
      	</ul>
      	<div id="login" class="col s12">
      		<form class="col s12">
      			<div class="form-container">
      				<div class="row">
                <br>
      					<div class="input-field col s12">
      						<input id="email" type="email" class="validate" v-model='email'>
      						<label for="email">Email</label>
      					</div>
      				</div>
      				<div class="row">
      					<div class="input-field col s12">
      						<input id="password" type="password" class="validate" v-model='password'>
      						<label for="password">Password</label>
      					</div>
      				</div>
      				<br>
      				<center>
                <a class="btn modal-action modal-close waves-effect waves-green btn-flat" @click='resetForm'>Cancel</a>
      					<button class="btn waves-effect waves-light teal" type="submit" @click='login'>Connect</button>
      					<br>
      					<br>
                <a class="waves-effect waves-light btn social facebook">
                  <i class="fa fa-facebook"></i> Sign in with facebook</a>
      				</center>
      			</div>
      		</form>
      	</div>
      	<div id="register" class="col s12">
      		<form class="col s12">
      			<div class="form-container">
      				<div class="row">
                <br>
      					<div class="input-field col s12">
      						<input type="email" class="validate" v-model='email'>
      						<label for="email">Email</label>
      					</div>
      				</div>
      				<div class="row">
      					<div class="input-field col s12">
      						<input  type="password" class="validate" v-model='password'>
      						<label for="password">Password</label>
      					</div>
      				</div>
      				<center>
                <br>
      					<button class="btn waves-effect waves-light teal" type="submit" @click='register'>Submit</button>
      				</center>
      			</div>
      		</form>
      	</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.getApi()
  },
  data(){
    return {
      email: '',
      password: '',
      quote: ''
    }
  },
  name: 'Homepage',
  methods: {
    register(event){
      event.preventDefault()

      const user = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: user
      })
      .then((response) => {
        user.email = ''
        user.password = ''
        swal({
          title: "Yosh!",
          text: "Successfully register your account",
          icon: "success",
        });
      })
      .catch(err => {
        this.email=''
        this.password=''
        swal({
          text: "email is already exists",
          icon: "error",
        });
      })

    },
    login(event){
      event.preventDefault()

      const user = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: user
      })
      .then((response) => {
        user.email = ''
        user.password = ''
        const token = JSON.stringify(response.data.jwtToken)
        localStorage.setItem('authorization', token);
        this.$router.push('/todo')
        location.reload();
      })
      .catch(err => {
        this.email=''
        this.password=''
        swal({
          text: "email/password is wrong!",
          icon: "error",
        });
      })
    },

    getApi(){
      axios.get('https://got-quotes.herokuapp.com/quotes')
      .then((data) => {
        this.quote = data.data
      })
      .catch(err => {
        this.quote = `“The Way Get Started Is To Quit Talking And Begin Doing.” – Walt Disney`
      })
    },

    resetForm(){
      this.email=''
      this.password=''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.body-background{
  text-align: left;
  background-image: url('http://heavenwalls.com/wp-content/uploads/2017/11/Dark-Grey-Wallpaper-Hd-Pics--Backgrounds-For-Smartphone.jpg');
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}

h1 {
  margin: 20px 0 0;
}

ul {
  list-style-type: none;
  padding: 0 0 0 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
}

h5
{
	font-weight: 400;
}

.container{
	margin: 0 0 0 0;
	width: 455px;
	height: 100%;
}

.tabs .indicator
{
	background-color: #1e2121;
	opacity: 0.3;
}

.form-container
{
	padding: 40px;
	padding-top: 10px;
}

.confirmation-tabs-btn
{
	position: absolute;
}
element.style {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 1%;
}
</style>
