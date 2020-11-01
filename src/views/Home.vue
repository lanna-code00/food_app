<template>
<div>
   <h2 class="text-center mt-3 mb-2" :style="{color: 'red'}">ADMIN</h2>

 <div class="container mt-3">

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">User's Graph</h5>
         <v-sparkline
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
  ></v-sparkline>
      </div>
    </div>
  </div>


 <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Food Graph</h5>
         <v-sparkline
    :value="value2"
    :gradient="gradient2"
    :smooth="radius2 || false"
    :padding="padding2"
    :line-width="width2"
    :stroke-linecap="lineCap2"
    :gradient-direction="gradientDirection2"
    :fill="fill2"
    :type="type2"
    :auto-line-width="autoLineWidth2"
    auto-draw
  ></v-sparkline>
      </div>
    </div>
  </div>


</div>


<div class="row">
  <div class="col-sm-6">
    <div class="card shadow">
      <div class="card-body">
        <span class="fa fa-user fa-3x text-danger mb-3"> {{used}}</span>
        <p class="card-text">With supporting text below as a natural lead-in to additional content. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sunt quaerat dolore, commodi velit illo eaque</p>
        <router-link to="/userstable" style="text-decoration: none"><v-btn class="btn btn-primary">Users</v-btn></router-link>
      </div>
    </div>
  </div>
 <div class="col-sm-6">
    <div class="card shadow">
      <div class="card-body">
        <span class="fas fa-hamburger fa-3x text-danger mb-3"> {{myfoods}}</span>
        <p class="card-text">With supporting text below as a natural lead-in to additional content. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sunt quaerat dolore, commodi velit illo eaque</p>
        <router-link to="/foodtable" style="text-decoration: none"><v-btn class="btn btn-primary">Foods</v-btn></router-link>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Drinks Graph</h5>
         <v-sparkline
    :value="value3"
    :gradient="gradient3"
    :smooth="radius3 || false"
    :padding="padding3"
    :line-width="width3"
    :stroke-linecap="lineCap3"
    :gradient-direction="gradientDirection3"
    :fill="fill3"
    :type="type3"
    :auto-line-width="autoLineWidth3"
    auto-draw
  ></v-sparkline>
      </div>
    </div>
  </div>


 <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Cart's Graph</h5>
         <v-sparkline
    :value="value4"
    :gradient="gradient4"
    :smooth="radius4 || false"
    :padding="padding4"
    :line-width="width4"
    :stroke-linecap="lineCap4"
    :gradient-direction="gradientDirection4"
    :fill="fill4"
    :type="type4"
    :auto-line-width="autoLineWidth4"
    auto-draw
  ></v-sparkline>
      </div>
    </div>
  </div>


</div>



<div class="row">
  <div class="col-sm-6">
    <div class="card shadow">
      <div class="card-body">
        <span class="fas fa-cocktail fa-3x text-danger mb-3"> {{mydrinks}}</span>
        <p class="card-text">With supporting text below as a natural lead-in to additional content. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sunt quaerat dolore, commodi velit illo eaque</p>
        <router-link to="/drinkstable" style="text-decoration: none"><v-btn class="btn btn-primary">Drinks</v-btn></router-link>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card shadow">
      <div class="card-body">
        <span class="fas fa-shopping-cart fa-3x text-danger mb-3"> {{mycarts}}</span>
        <p class="card-text">With supporting text below as a natural lead-in to additional content. 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sunt quaerat dolore, commodi velit illo eaque</p>
        <router-link to="/drinkstable" style="text-decoration: none"><v-btn class="btn btn-primary">Don't click yet!</v-btn></router-link>
      </div>
    </div>
  </div>
</div>

</div>
  <!-- <button @click="usersgraph()">cllick</button> -->
</div>
</template>


<script>
import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex'
 const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  const gradients2 = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  const gradients3 = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

   const gradients4 = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

export default {
  name: 'Home',
  data() {
    return{
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      value: '',

       width2: 2,
      radius2: 10,
      padding2: 8,
      lineCap2: 'round',
      gradient2: gradients2[5],
      gradientDirection2: 'top',
      gradients2,
      fill2: false,
      type2: 'trend',
      autoLineWidth2: false,
      value2: '',

        width3: 2,
      radius3: 10,
      padding3: 8,
      lineCap3: 'round',
      gradient3: gradients3[5],
      gradientDirection3: 'top',
      gradients3,
      fill3: false,
      type3: 'trend',
      autoLineWidth3: false,
      value3: '',

       width4: 2,
      radius4: 10,
      padding4: 8,
      lineCap4: 'round',
      gradient4: gradients4[5],
      gradientDirection4: 'top',
      gradients4,
      fill4: false,
      type4: 'trend',
      autoLineWidth4: false,
      value4: '',
    }
    },

    computed: {
     ...mapGetters(['fooduser', 'allfoods', 'alldrinks', 'newcarts']),
     used(){
       return this.fooduser.length
     },

     myfoods(){
       return this.allfoods.length
     },

      mydrinks(){
       return this.alldrinks.length
     },

      mycarts(){
       return this.newcarts.length
     }
    },

methods: {
  ...mapActions(['myusers','fetchallfoods', 'fetchalldrinks', 'getallcart']),

   getnumberofusers(){
     Axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/allusers.php')
     .then((res) => {
       let e = res.data;
       this.value = e.map(function (obj) {
         return Number(obj.user_id)
       })
       console.log(this.value);
     }).catch(err => console.log(err))
   },

  getnumberoffoods(){
     Axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getfood.php')
     .then((res) => {
       let e = res.data;
       this.value2 = e.map(function (obj) {
         return Number(obj.food_id)
       })
       console.log(this.value2);
     }).catch(err => console.log(err))
   },

    getnumberofdrinks(){
     Axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getdrinks.php')
     .then((res) => {
       let e = res.data;
       this.value3 = e.map(function (obj) {
         return Number(obj.drink_id)
       })
       console.log(this.value3);
     }).catch(err => console.log(err))
   },

      getnumberofcarts(){
     Axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getcart.php')
     .then((res) => {
       let e = res.data;
       this.value4 = e.map(function (obj) {
         return Number(obj.table_id)
       })
       console.log(this.value4);
     }).catch(err => console.log(err))
   },

},


created(){
  this.getnumberofusers();
  this.getnumberofcarts();
  this.getnumberofdrinks();
  this.getnumberoffoods();
  this.myusers();
  this.fetchallfoods();
  this.fetchalldrinks();
  this.getallcart();
}

}
</script>