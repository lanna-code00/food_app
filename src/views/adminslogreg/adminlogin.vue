<template>
    

<div>

<div class="container ">
      <div class="col-md-9 row mx-auto">
      
   <div class="card row mx-auto shadow-sm mt-5" style="left: 0">
         <h4 class="text-center text-danger" style="letter-spacing: 3px">LOGIN FORM</h4>
     <div class="card-body">

       <p class="forgot2" id="correct" :style="{color: 'red'}" align="center">{{correct}}</p>

    <div class="row">
      
       <div class="col-md-12">
       <v-text-field
              label="Username"
              prepend-icon="mdi-account-circle"
              style="outline: none"
              v-model="logindetails.username"
        ></v-text-field>
  </div>

  <div class="col-md-12">
       <v-text-field
              label="Password"
              prepend-icon="mdi-lock"
              :type="show ? 'show' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              v-model="logindetails.password"
        ></v-text-field>
  </div>
</div>

     

     <div class="m-1 float-right">
     <v-btn class="bg-danger text-white" @click="submitlogin(logindetails)" style="border-radius: 16px">login</v-btn>
   </div>
       <div class="m-1">
       <router-link to="/registration" style="text-decoration: none"><v-btn class="bg-danger text-white" style="border-radius: 16px">Register</v-btn></router-link>
   </div>
    </div>


  <v-progress-linear 
            color="#0D47A1"
            indeterminate
            rounded
            height="5"
            v-if="linearval"
      ></v-progress-linear>
   </div>
</div>

</div>
</div>

</template>



<script>
// import { mapActions, mapGetters } from 'vuex';
import Axios from 'axios';
export default {
      name: 'Adminlogin',
      data(){
            return {
            show: false,
            linearval: false,
            logindetails: {
                username: '',
                password: '',
            },
            correct: '',
            }
      },

     methods: {      

        submitlogin(users){

            this.linearval = true
           console.log(users);
            Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/adminlogin.php',
              {
              'username': this.logindetails.username,
              'password': this.logindetails.password,
              }
            ).then((res) => {
                let e = res.data.success;
                console.log(e);
                if (e) {
                    localStorage.setItem('ids2', JSON.stringify(e));
                    this.correct='';
                    setTimeout(() => {
                         this.linearval = true
                        this.$router.push('/home');
                    }, 3000);
                }
                else{
                  setTimeout(() => {
                    this.linearval = false
                  }, 1000);
                  this.correct = 'Incorrect username or password!';
                  this.logindetails.password = '';
                }
            })
            .catch(err => console.log(err));
        }
}
}
</script>