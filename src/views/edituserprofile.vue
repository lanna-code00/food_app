<template>
    
  <div>

<div class="container">
   <h5 class="text-danger text-center">EDIT PROFILE</h5>
  <v-form >
    <v-container>
      <v-row v-for="edit in fooduser" :key="edit.user_id">
          <v-col v-if="used == edit.user_id">
               <v-col hidden
          cols="12"
          md="6"
        >
          <v-text-field
            label="Name"
            required
            v-model="edit.user_id"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Name"
            required
            v-model="edit.name"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Username"
            required
            v-model="edit.username"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="E-mail"
            required
            v-model="edit.email"
          ></v-text-field>
        </v-col>

         <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Phone"
            required
            v-model="edit.phone"
          ></v-text-field>
        </v-col>
        </v-col>
      </v-row>
</v-container>
  </v-form>
        <v-btn class="ml-4 btn btn-danger" @click="exitpage()"> <span class="fa fa-times fa-2x"></span> </v-btn>
        <v-btn class="float-right mr-4 btn btn-success" @click="saveuser(used)" id="myBtn"> <span class="fa fa-check fa-2x"></span> </v-btn>

  <!-- dialog -->

  <!-- <button>Open Modal</button> -->

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p class="text-center">{{success}}</p>
  </div>

</div>

  <!-- dialog ends -->
  <!-- </v-form> -->

</div>

  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Axios from 'axios';
import $ from 'jquery'
  export default {
    name: 'Edituserprofile',
    data () {
      return {
        used: this.$route.params.id,
        success: ''
      }
    },

    computed: {
        ...mapGetters(['fooduser'])
    },
 
    methods: {
        ...mapActions(['myusers']),
        saveuser(ty){
            let e = this.fooduser.filter(p => p.user_id == ty)
            e.map((element) => {
              var r = {
                'id': element.user_id,
                'name': element.name,
                'username': element.username,
                'email': element.email,
                'phone': element.phone
              }
              Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/editusers.php',r)
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

        exitpage(){
         this.$router.push({name: 'userdashboard'});
        }
    },
    created(){
        console.log(this.used)
    }
  }
</script>


<style scoped>
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
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>