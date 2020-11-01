<template>
    <div>
    


       
       <div class="container ">
      <div class="col-md-9 row mx-auto">
      
   <div class="card row mx-auto shadow-sm mt-5" style="left: 0">
         <h4 class="text-center text-danger mt-3" style="letter-spacing: 3px">EDIT FORM</h4>
         <div>
     <div class="card-body" v-for="edit in admins" :key="edit.admin_id">
      <div v-if="usery == edit.admin_id">
    <div class="row">
       <div class="col-md-6">
       <v-text-field
              label="Username"
              prepend-icon="mdi-account-circle"
              style="outline: none"
              v-model="edit.firstname"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Password"
              prepend-icon="mdi-account-circle"
              v-model="edit.lastname"
        ></v-text-field>
  </div>
  </div>
  <div class="row">
       <div class="col-md-6">
       <v-text-field
              label="Username"
              prepend-icon="mdi-account-circle"
              style="outline: none"
              v-model="edit.username"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Password"
              prepend-icon="mdi-account-circle"
              v-model="edit.email"
        ></v-text-field>
  </div>
  </div>
  <div class="row">
       <div class="col-md-6">
       <v-text-field
              label="Username"
              prepend-icon="mdi-account-circle"
              style="outline: none"
              v-model="edit.phone"
        ></v-text-field>
  </div>

  <div class="col-md-6">
       <v-text-field
              label="Password"
              prepend-icon="mdi-account-circle"
              v-model="edit.address"
        ></v-text-field>
  </div>

  </div>
</div>

     

    </div>
     <div class="m-1 float-right">
     <v-btn class="bg-danger text-white" @click="savedetails(usery)" style="border-radius: 16px">login</v-btn>
   </div>

   </div>
   </div>
</div>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p class="text-center">{{success}}</p>
  </div>

</div>

</div>





    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import Axios from 'axios';
import $ from 'jquery'
export default {
    name: 'Setting',
    data(){
        return {
            users: this.$route.params.id,
            usery:"",
            success: '',
        }
    },

    computed: {
        ...mapGetters(['admins'])
    },

    methods: {
        ...mapActions(['getalladmins']),

      getadminid(){
           this.usery = JSON.parse(localStorage.ids2);
          console.log(this.usery);
      },

      savedetails(ty){
            let e = this.admins.filter(p => p.admin_id == ty)
            e.map((element) => {
              var r = {
                'id': element.admin_id,
                'firstname': element.firstname,
                'lastname': element.lastname,
                'username': element.username,
                'email': element.email,
                'phone': element.phone,
                'address': element.address,
              }
              Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updateadmin.php',r)
              .then(res => console.log(res))
              .catch(err => console.log(err))
              this.success = "SUCCESSFUL!"
              var modal = document.getElementById("myModal");
              modal.style.display = "block";
                setTimeout(() => {
                  $('#myModal').fadeToggle(2000);  
                }, 1000);
            
            })
      },

    },

    created(){
        // console.log(this.users);
        this.getadminid();
        this.getalladmins();
    }
}
</script>