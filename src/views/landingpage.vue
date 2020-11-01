<template>

<div>

  <v-card class="overflow-hidden bgcolor">
    <v-app-bar style="background-color: #220138;" class="text-white"
      absolute
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>

       <strong>N</strong>
       <strong>W</strong>
       <strong>A</strong>
       <strong class="text-danger">N</strong>
       <strong class="text-danger">N</strong>
       <strong class="text-danger">E</strong>
       <strong class="text-danger ml-1">F</strong>
       <strong class="text-danger">O</strong>
       <strong class="text-danger">O</strong>
       <strong class="text-danger">D</strong>
       <strong class="text-danger">S</strong>



      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <div class="dropdown show" >
   <v-btn icon class="text-white"  id="dropdownMenuLink" data-toggle="dropdown">
        <v-icon class="text-white" >mdi-dots-vertical</v-icon>
      </v-btn>
 

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <router-link to="/addedtocart" class="dropdown-item">
      <span class="text-danger">{{ Number(allcarts) + Number(allcarts2)}}</span><i class="fa-1x fa fa-shopping-cart mr-2" style="color: #4A148C">
      </i>shopping
      </router-link>
    <router-link to="/login" class="dropdown-item"><i class="fa-1x fa fa-sign-in mr-2" style="color: #4A148C"></i>login</router-link>
    <router-link to="/signup" class="dropdown-item"><i class="fa-1x fa fa fa-user-plus mr-2" style="color: #4A148C"></i>sign-up</router-link>
    <div v-if="ids">
      <router-link :to="{name: 'user', params: {id: ids}}" class="dropdown-item"><i class="fa-1x fa fa fa-user mr-2" style="color: #4A148C"></i>Profile</router-link>
    </div>
    <div v-else>
      <router-link to="/profilelogin" class="dropdown-item" hidden><i class="fa-1x fa fa fa-user mr-2" style="color: #4A148C"></i>Profile</router-link>
    </div>
    
  </div>
</div>


      <template v-slot:extension>
        <v-tabs align-with-title>
         <v-tab><router-link to="/" style="text-decoration: none; color:white">FOODS</router-link></v-tab>
          <v-tab> <router-link to="/viewdrinks" style="text-decoration: none;color:white">DRINKS</router-link></v-tab>
          <!-- <v-tab>Tab 3</v-tab> -->
        </v-tabs>
      </template>
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


          <h5 class="text-center mr-5">MENU</h5>

          <router-link to="/"><v-list-item class="justify-content-center">
            <v-list-item-icon>
              <v-icon class="ml-5 mt-4">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 mt-4 mb-3">Our Foods</v-list-item-title>
          </v-list-item></router-link>

          <v-list-item>
            <v-list-item-icon>
              <v-icon class="ml-5 mt-4">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 mt-4 mb-3">About Us</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon class="ml-5 mt-4">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 mt-4">Contact Us</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-sheet
      id="scrolling-techniques-3"
      max-height="700"
    >
      <v-container style="height: 250px;"></v-container>
    </v-sheet>
    <router-view/>
  </v-card>

</div>

</template>

<script>
import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Navbar',
    data(){
      return{
        drawer: false,
        newarr: '',
        arr: '',
        ids: ''
      }
    },

    computed: {
      ...mapGetters(['allcarts', 'allcarts2', 'newcarts', 'totalarrayindb']),

    },

    methods:{

    ...mapActions(['numbercart', 'numbercart2']),
 
      getallcarts() {
         Axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getcart.php')
        .then(res => this.arr = res.data.length)
        .catch(err=>console.log(err))

      },

      getlocalId(){
        this.ids = JSON.parse(localStorage.getItem('ids'))
        console.log(this.ids)
      }
      
    },
    created(){
      this.getlocalId();
      this.numbercart();
      this.numbercart2();
      this.getallcarts();
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