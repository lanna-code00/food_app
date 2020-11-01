import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Landingpage from '../views/landingpage.vue'
import Navbar from '../components/navbar.vue'
import Viewfood from '../views/viewfood.vue'
import Viewdrinks from '../views/viewdrinks.vue'
import Foodtable from '../views/foodtable.vue'
import FoodDetails from '../views/foodDetails.vue';
import Login from '../views/login.vue';
import Signup from '../views/signup.vue';
import Newtable from '../views/newtable.vue';
import Addedtocart from '../views/addedtocart.vue';
import Payment from '../views/payment.vue';
import Useraddress from '../views/usersaddress.vue';
import Thankyou from '../views/thankyou.vue';
import Userstable from '../views/userstable.vue';
import Detailtab from '../views/detailtab.vue';
import User from '../views/user.vue';
import Profilelogin from '../views/profilelogin.vue';
import Userdashboard from '../views/userdashboard.vue';
import Edituserprofile from '../views/edituserprofile.vue';
import Drinkstable from '../views/drinkstable.vue';
import History from '../views/userhistory.vue';
import Registration from '../views/adminslogreg/registration.vue';
import Adminlogin from '../views/adminslogreg/adminlogin.vue';
import Setting from '../views/setting.vue';

import Notfound from '../views/notfound.vue';


Vue.use(VueRouter)

  const routes = [
 
    {
      path: '/navbar',
      name: 'navbar',
      component: Navbar,
      children: [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
       
  {
    path: '/foodtable',
    name: 'foodtable',
    component: Foodtable
  },

  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },

  {
    path: '/drinkstable',
    name: 'drinkstable',
    component: Drinkstable
  },

   
  {
    path: '/userstable',
    name: 'userstable',
    component: Userstable
  },

  {
    path: '/detailtab',
    name: 'detailtab',
    component: Detailtab
  },

  
  {
    path: '/newtable',
    name: 'newtable',
    component: Newtable
  },
      ]
    },
    
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      children: [
        {
          path: '/',
          name: 'userdashboard',
          component: Userdashboard
        },
        {
          path: '/Edituserprofile/:id',
          name: 'edituserprofile',
          component: Edituserprofile
        },
        {
          path: '/userhistory/:id',
          name: 'userhistory',
          component: History
        }
      ]
    },
    
  {
    path: '/',
    name: 'landingpage',
    component: Landingpage,
    children: [
      {
        path: '/',
        name: 'viewfood',
        component: Viewfood
      },
      
      {
      path: '/usersaddress/:user_id',
      name: 'useraddress',
      component: Useraddress
    },
      {
        path: '/viewdrinks',
        name: 'viewdrinks',
        component: Viewdrinks
      },

      {
        path: '/foodDetails/:foodid',
        name: 'foodDetails',
        component: FoodDetails
      },

      {
        path: '/addedtocart',
        name: 'addedtocart',
        component: Addedtocart
      },

    ]
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/profilelogin',
    name: 'profilelogin',
    component: Profilelogin,
  },

  {
    path: '/thankyou/:id?',
    name: 'thankyou',
    component: Thankyou,
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },

  {
    path: '/registration',
    name: '/registration',
    component: Registration,
  },

  {
    path: '/adminlogin',
    name: '/adminlogin',
    component: Adminlogin,
  },

  {
    path: '/payment/:id',
    name: 'payment',
    component: Payment
  },

  {
    path: '*',
    component: Notfound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
