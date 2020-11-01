<template>
    
<div>

<div class="container ">
  <h3 class="text-center mt-5 text-danger" style="letter-spacing:4px">REGISTRATION FORM </h3>
<div class="card shadow mt-5">
      <div class="card-body">
<div>
<form @submit="onSubmit">
<div class="row">

  <div class="col-md-6">
       <v-text-field
              label="Firstname"
              filled
              prepend-icon=""
              v-model="admin.firstname"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Lastname"
              filled
              prepend-icon=""
              v-model="admin.lastname"
        ></v-text-field>
  </div>

</div>

<div class="row">

  <div class="col-md-6">
       <v-text-field
              label="Username"
              filled
              prepend-icon=""
              v-model="admin.username"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Email"
              filled
              prepend-icon=""
              v-model="admin.email"
        ></v-text-field>
  </div>

</div>

<div class="row">

  <div class="col-md-6">
       <v-text-field
              label="Phone"
              filled
              prepend-icon=""
              v-model="admin.phone"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Address"
              filled
              prepend-icon=""
              v-model="admin.address"
        ></v-text-field>
  </div>

</div>

<div class="row">

  <div class="col-md-6">
       <v-text-field
              label="Password"
              filled
              prepend-icon=""
              :type="show ? 'show' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              v-model="admin.password"
        ></v-text-field>
  </div>
<div class="col-md-2">
        <img id="image" src="" alt="--food image" style="width: 50px; height: 50px"/>
  </div>

  <div class="col-md-4">
        <input type="file" name="" id="" ref="file" v-on:change="readURL($event)" >
  </div>


   <div class="m-1">
       <v-btn type="submit" class="bg-danger text-white" style="border-radius: 16px">Register</v-btn>
   </div>
</div>

</form>
    <div class="m-1 float-right">
    <label for="" class="mr-1 text-danger" style="font-size: 17px; letter-spacing: 3px">An admin already?</label>
      <router-link to="/adminlogin" style="text-decoration: none"><v-btn class="bg-danger text-white" style="border-radius: 16px">login</v-btn></router-link>
   </div>
</div>
</div>
</div>


</div>



</div>


</template>



<script>
import { mapActions } from 'vuex';
import $ from 'jquery'
export default {
  name: "Registration",
  data(){
    return {
      show: false,
       admin:{
        file: [], 
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
       }, 
    }
  },

  methods: {
    ...mapActions(['regadmin']),

      onSubmit(e){
           e.preventDefault();
        let formData = new FormData();
        // formData.append('myid', myid++);
        formData.append('firstname', this.admin.firstname);
        formData.append('lastname', this.admin.lastname);
        formData.append('username', this.admin.username);
        formData.append('email', this.admin.email);
        formData.append('phone', this.admin.phone);
        formData.append('address', this.admin.address);
        formData.append('password', this.admin.password);
        formData.append('myfile', this.admin.file);

        this.regadmin(formData);
      },

       readURL(event){
        this.admin.file = event.target.files[0];
        // console.log(this.foods.file)
        if (this.admin.file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image').attr('src', e.target.result);
                };

                reader.readAsDataURL(event.target.files[0]);
            }
      },
  }
}
</script>