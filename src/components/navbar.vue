<template>
  <v-card
    class="mx-auto"
    height="900"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

<div v-for="adns in admins" :key="adns.admin_id">
           <div v-if="usery == adns.admin_id">
      <v-toolbar-title>Hi {{adns.username}}</v-toolbar-title>
  </div>
</div>
       <v-spacer></v-spacer>
       <div>
        <router-link to="/setting" style="text-decoration:none"><v-btn icon class="text-white">
        <v-icon class="text-white">mdi-nut</v-icon>
      </v-btn></router-link>
      </div>

       <div v-for="ads in admins" :key="ads.admin_id">
           <div v-if="usery == ads.admin_id">
           <img :src="require(`../assets/food_php/adminpics/${ads.picture}`)" 
           style="width: 30px; height: 30px; border-radius: 30px" alt="hello" srcset="">
         </div>
         </div>


 
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group class="mt-3"
         
          active-class="deep-purple--text text--accent-4"
        >

        
  <v-avatar class="row mt-4 mx-auto" v-for="admin in admins" :key="admin.admin_id">
           <div v-if="usery == admin.admin_id">
      <img
        :src="require(`../assets/food_php/adminpics/${admin.picture}`)"
        :alt="`${admin.username}`"
      >
         </div>
    </v-avatar>
          <router-link to="/home" style="text-decoration: none"><v-list-item class="ml-5 mt-5">
              <span class="fa fa-tachometer fa-2x text-danger"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">HOME</v-list-item-title>
          </v-list-item></router-link>

          <router-link to="/foodtable" style="text-decoration: none"><v-list-item class="ml-5 mt-2">
              <span class="fas fa-hamburger fa-2x"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">FOODS</v-list-item-title>
          </v-list-item></router-link>

          <router-link to="/drinkstable" style="text-decoration: none"><v-list-item class="ml-5 mt-2">
              <span class="fas fa-cocktail fa-2x text-danger"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">DRINKS</v-list-item-title>
          </v-list-item></router-link>

          <router-link to="/userstable" style="text-decoration: none"><v-list-item class="ml-5 mt-2">
              <span class="fa fa-user fa-2x"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">USERS</v-list-item-title>
          </v-list-item></router-link>

          <router-link to="/detailtab" style="text-decoration: none"><v-list-item class="ml-5 mt-2">
              <span class="fas fa-info fa-2x text-danger"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">USER DETAILS</v-list-item-title>
          </v-list-item></router-link>

          <v-list-item class="ml-5 mt-2" @click="logoutadmin()">
              <span class="fa fa-tachometer fa-2x"></span>
            <v-list-item-title class="ml-2 mt-4 mb-3" style="font-size:15px">LOG-OUT</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view/>


  </v-card>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'Navbar',
    data: () => ({
      drawer: false,
      usery: '',
    }),

    computed: {
      ...mapGetters(['admins'])
    },

    methods: {
      ...mapActions(['getalladmins']),
      
      checkid(){
        this.usery = JSON.parse(localStorage.ids2);
        console.log(this.usery);
      },

      logoutadmin(){
        this.$router.push('/adminlogin');
        localStorage.removeItem('ids2');
      }
    },

    created(){
      this.getalladmins();
      this.checkid();
    }
  }
</script>