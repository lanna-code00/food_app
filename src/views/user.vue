<template>

<div>
    
  <v-card 
    class="mx-auto "
    height="2000"
  >
    <v-app-bar style="background-color: #4A148C;" class="text-white"
    >
      <v-app-bar-nav-icon @click="drawer = true" class="text-white"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
        class="mt-4"
      >
        <v-list-item-group class="mt-3" active-class="deep-purple--text text--accent-4">
           <div v-for="users in fooduser" :key="users.user_id">
       <div v-if="used == users.user_id">
          <h5 class="text-center mr-5 text-danger">Hi {{users.username}}</h5>
      </div>
      </div>
                  <!-- <h5 class="text-center mr-5">MENU</h5> -->
         <v-list-item class="justify-content-center" @click="userdashboard()">
            <v-list-item-title class="ml-5 mt-4 mb-3">Dashboard</v-list-item-title>
          </v-list-item>

         <router-link :to="{name: 'edituserprofile', params: {id: used}}" style="text-decoration: none"><v-list-item>
            <v-list-item-title class="ml-5 mt-4 mb-3">Edit Profile</v-list-item-title>
          </v-list-item></router-link>

            <router-link :to="{name: 'userhistory', param: {id: used}}" style="text-decoration: none"><v-list-item>
            <v-list-item-title class="ml-5 mt-4 mb-3">History</v-list-item-title>
          </v-list-item></router-link>

          <v-list-item @click="logout()">
            <v-list-item-title class="ml-5 mt-4">Log-Out</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view/>


  </v-card>
</div>

</template>

<script>
// import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
// import Edituserprofile from './edituserprofile';
  export default {
    name: 'Navbar',
    data(){
      return{
        drawer: false,
        used: this.$route.params.id,
        newarr: '',
        arr: ''
      }
    },

    computed: {
      ...mapGetters(['fooduser']),
    },

    methods:{

    ...mapActions(['numbercart', 'myusers']),
    
    userdashboard(){
      this.$router.push({name: 'userdashboard'})
    },

    logout(){
      this.$router.push('/login');
      localStorage.removeItem('ids')
    }
 
  }, 

  created(){
      console.log(this.used)
      this.myusers();

  }

  }


</script>

<style scoped>
   v-card {
     background: #000000;
   }
   .demo-badge div{
      margin-bottom: 16px;
   }
</style>