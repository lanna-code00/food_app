<template>

<div>
 <div class="col-md-12" v-for="user in fooduser" :key="user.user_id">     
            <div v-if="usery == user.user_id">

              <h5 class="text-center mt-2" :style="{color: 'red'}">Hi {{user.username}}</h5>

  <div class="container">
    <p style="letter-spacing: 2px; color: red;" class="text-center">Billing information</p>
   <div class="row justify-content-center">
             <v-text-field
              label="Name"
              filled
              prepend-icon=""
              v-model="userdetail.name"
              class="col-sm-5 ml-1"
             ></v-text-field>
             
              <v-text-field
              label="Lastname"
              filled
              prepend-icon=""
              v-model="userdetail.lastname"
              class="col-sm-5 ml-1"
             ></v-text-field>
        </div>


          <div class="row justify-content-center">

               <v-text-field
              label="Phone"
              filled
              prepend-icon=""
              v-model="userdetail.phone"
              class="col-sm-5 ml-1"
             ></v-text-field>

             <v-text-field
              label="City"
              filled
              type="text"
              prepend-icon=""
             v-model="userdetail.city"
              class="col-sm-5 ml-1"
             ></v-text-field>

           </div>


              <div class="row justify-content-center">
              <v-text-field
              label="Address"
              filled
              type="text"
              prepend-icon=""
              v-model="userdetail.address"
               class="col-md-10"
             ></v-text-field>
              </div>

            <div class="row justify-content-center mt-3">
                <v-btn type="button" class="btn btn-secondary" ><span class="fa fa-times fa-2x text-danger"></span></v-btn>
        <v-btn type="button" class="btn btn-primary ml-5" @click="submitdetails()"><span class="fa fa-check fa-2x text-success"></span></v-btn>
           </div>
</div>
  <!-- </v-card> -->


<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
      <div class="row mx-auto">
       <v-progress-circular :style="{color: 'red'}"
      :rotate="360"
      :size="100"
      :width="8"
      :value="value"
    >
      {{ value }}
    </v-progress-circular>
    </div>
    <p style="letter-spacing: 2px; color:red" class="text-center"> <i> ...processing your information </i></p>
    <!-- <p class="text-center">{{success}}</p> -->
  </div>

</div>


  </div> 
 </div> 

 </div>           

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Axios from 'axios';
import $ from 'jquery';
export default {
  name: 'Usersaddress',
  data(){
    return{
       usery: this.$route.params.user_id,
       userdetail: {
         name: '',
         lastname: '',
         phone: '',
         city: '',
         address: '',
         status: 'ready',
       },
       interval: {},
        value: 0,
    }
  },
  computed: {
    ...mapGetters(['fooduser', 'allfoods']),
    
  },
  methods: {
     ...mapActions(['myusers']),

     submitdetails(){
       Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/userdetails.php', 
       {
         'name': this.userdetail.name,
         'lastname': this.userdetail.lastname,
         'phone': this.userdetail.phone,
         'city': this.userdetail.city,
         'address': this.userdetail.address,
         'status': this.userdetail.status,
       }
       ).then((res) => {
         console.log(res.data);
         let e = res.data;
         if(e){
           this.loader();
             var modal = document.getElementById("myModal");
               modal.style.display = "block";
           setTimeout(() => {
          $('#myModal').fadeToggle(11000);  
           this.$router.push('/payment/' + this.usery);
           }, 11000);
         }
       })
       .catch(err => console.log(err));
     },

     loader(){
       this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
     }
  },

    // mounted () {
    //   this.loader()
    // },

  created(){
    console.log(this.usery);
    this.myusers();
  }
  
}
</script>

<style scoped>
.v-progress-circular {
  margin: 7rem;
}
body {font-family: Arial, Helvetica, sans-serif;}

.modal {
  display: none;
  position: fixed; 
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  background-color:#ffffff; 
  border: 1px solid #888;
}

</style>