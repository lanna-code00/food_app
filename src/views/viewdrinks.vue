<template>
<div class="container">

  
    <v-container fluid>
     <!-- <v-text-field class="width: 100px" label="Search food..." style="color:#4A148C" v-model="search"></v-text-field> -->
  
   <h2 class="text-center">DRINKS</h2>
         <md-table-toolbar>
<md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search"/>
        </md-field>
      </md-table-toolbar>
      <v-row dense>
        <v-col class="col-sm-4"
          v-for="drinks in alldrinks"
          :key="drinks.drinks_id"
          :cols="drinks.flex"
        >
          <v-card>
            <v-img
              :src="require(`../assets/food_php/uploads/${drinks.drink_picture}`)"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
             
            >
              <v-card-title class="text-white" v-text="drinks.drink_name"></v-card-title>
            </v-img>


            <v-card-actions>
           
              <p id="change" hidden></p>

              <v-btn style="background: none; box-shadow: none">
                 <div>N{{drinks.drink_price}}</div>
              </v-btn>

              <v-spacer></v-spacer>


       <v-btn style="background: none; box-shadow:none">
          <div>{{drinks.drink_quantity}} remains</div>
       </v-btn>
                <v-text-field col="2" sm="2" v-model="quantity" type="number" label="Qty"></v-text-field>
            
                 <v-btn style="background: none; box-shadow: none" @click="addtocart(drinks)">
                 <div style="color:#D50000"><i class="fa fa-shopping-cart fa-1x" style="color:#D50000"></i>Add</div>
              </v-btn>              
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
    <router-view/>

    </v-container>


</div>
  <!-- </v-card> -->


</template>

<script>
import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Viewdrinks',
    data(){
     return {
       subtract: '',
       alltime: '',
       search: '',
       newcart: [],
       quantity: '',
       food: {},
       mystore: {},
       obj: {},
     }
    },
    computed: {
      ...mapGetters(['alldrinks', 'allcarts', 'newcarts']),  
      },

    methods: {
        ...mapActions(['fetchalldrinks', 'numbercart2', 'addfoodtocart', 'getallcart']),

            getaddtocart(){
             let cart;
             if (localStorage.getItem('drinkcarts') == null) {
               cart = [] 
             } else {
               cart = JSON.parse(localStorage.getItem('drinkcarts', 'cartsNum'));
             }
             return cart;
            },

        addtocart(ty){
          this.subtract = ty.drink_quantity - this.quantity;
          console.log(this.subtract);
          ty.drink_quantity = this.subtract;
          console.log(ty.drink_quantity);
          let r = ty.drink_price.split(",");
          let t = r.join('')
          let total = this.quantity * t;
          var n = total.toLocaleString();
          this.mystore = {
            drink_id: ty.drink_id,
            drink_name: ty.drink_name,
            drink_price: ty.drink_price,
            drink_quantity: this.quantity,
            drink_picture: ty.drink_picture,
            food_initialquantity: ty.drink_quantity,
            food_total_row: total
          }
          // initial adding //
          var cart = this.getaddtocart();
          // var food = this.getaddallfoods();
          if(cart.find(p => p.drink_id == ty.drink_id)){
          //   if (cart) {
              let newobj = [{
              drink_id: ty.drink_id,
            drink_name: ty.drink_name,
            drink_price: ty.drink_price,
            drink_quantity: this.quantity,
            drink_picture: ty.drink_picture,
            food_initialquantity:ty.drink_quantity,
            food_total_row: n,
          }]
             cart = newobj;

          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatedrinktb.php', 
              {
                'id': ty.drink_id,
              'quantity': ty.drink_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=> console.log(err));

              var items = JSON.parse(localStorage.drinkcarts);
             for (var i = 0; i < items.length; i++) {
               if(ty.drink_id === items[i].drink_id){  
                 console.log(items[i].drink_id);
                 console.log(ty.drink_id);
                  items[i].drink_quantity = this.quantity; 
                  items[i].food_initialquantity = this.subtract
                  }
                 }
                localStorage.setItem("drinkcarts", JSON.stringify(items));
            console.log('Eureka!')
          }
          else{
            var tys = cart.push(this.mystore);
            this.quantity = '';
          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatedrinktb.php', 
              {
                'id': ty.drink_id,
              'quantity': ty.drink_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=>console.log(err))

           
            this.numbercart2(tys);
           localStorage.setItem('drinkcarts', JSON.stringify(cart))
            localStorage.setItem('cartsNum2', JSON.stringify(cart.length))
           
          }
        },


        addtocarts(ty){
        if(this.newcarts.find(p => p.food_id == ty.food_id)){
           console.log('it\'s here o')
        } else{
          ty = new FormData();
        ty.append('myname', this.food.food_name);
        ty.append('myprice', this.food.food_price);
        ty.append('myquantity', this.food.food_quantity);
        ty.append('myfile', this.food.food_picture);
        console.log(this.food.food_picture);
         this.addfoodtocart(ty);
        }
        }
      

    },
    created(){
        this.fetchalldrinks();
        this.myFunction();
        this.getaddtocart()

    },
}
</script>

<style scoped>
 
input[type=text] {
  width: 160px;
  box-sizing: border-box;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom-style: 2px solid #ccc;
  border-radius: 80px;
  font-size: 16px;
  outline: none;
  color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0);
  /* background-image: url('searchicon.png'); */
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.9s ease-in-out;
}

input[type=text]:focus {
  width: 100%;
}

</style>