<template>
<div class="container">

  
    <v-container fluid>
     <!-- <v-text-field class="width: 100px" label="Search food..." style="color:#4A148C" v-model="search"></v-text-field> -->
  
   <h2 class="text-center"> FOOD LIST IN OUR RESTUARANT</h2>
         <md-table-toolbar>
<md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search"/>
        </md-field>
      </md-table-toolbar>
      <v-row dense>
        <v-col class="col-sm-4"
          v-for="foods in allfoods"
          :key="foods.food_id"
          :cols="foods.flex"
        >
          <v-card>
            <v-img @click="gotodetails(foods.food_id)"
              :src="require(`../assets/food_php/uploads/${foods.food_picture}`)"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
             
            >
              <v-card-title class="text-white" v-text="foods.food_name"></v-card-title>
            </v-img>


            <v-card-subtitle class="pb-0">
       <v-btn style="background: none; box-shadow: none">
                 <div v-if="alltime < `${foods.food_time.slice(0,2)%12, foods.food_time.slice(-3)}`">{{ foods.food_time.slice(0,2)%12 }} {{ foods.food_time.slice(-3)}} <span v-if="foods.food_time.slice(0,2)>=12">pm</span> <span v-else>am</span></div>
                 <div v-else>Available</div>
              </v-btn >
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{foods.food_detail}}</div>
    </v-card-text>

            <v-card-actions>

<!-- <td>{{ food.food_time.slice(0,2)%12 }} {{ food.food_time.slice(-3)}} <small v-if="food.food_time.slice(0,2)>=12">pm</small> <small v-else>am</small></td> -->

             

              <!-- <v-btn style="background: none; box-shadow: none"> -->
              <!-- </v-btn> -->
           
              <p id="change" hidden></p>

              <v-btn style="background: none; box-shadow: none">
                 <div>N{{foods.food_price}}</div>
              </v-btn>

              <v-spacer></v-spacer>


       <v-btn style="background: none; box-shadow:none">
          <div>{{foods.food_quantity}} remains</div>
       </v-btn>
                <v-text-field col="2" sm="2" v-model="quantity" type="number" label="Qty"></v-text-field>
            
                 <v-btn style="background: none; box-shadow: none" @click="addtocart(foods)">
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
    name: 'Viewfood',
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
      ...mapGetters(['allfoods', 'allcarts', 'newcarts']),  
      },

    methods: {
        ...mapActions(['fetchallfoods', 'numbercart', 'addfoodtocart', 'getallcart']),

        gotodetails(food_id){
          this.$router.push({name: 'foodDetails', params:{foodid: food_id}});
        },

        myFunction() { 
                var time = new Date();
                var hours = time.getHours(); 
                var minutes = time.getMinutes(); 
                var newformat = hours >= 12 ? 'PM' : 'AM';  
                hours = hours % 12;  
                hours = hours ? hours : 12;  
                minutes = minutes < 10 ? '0' + minutes : minutes; 
                this.alltime = hours + ':' + minutes + ' ' + newformat; 
                console.log(this.alltime)
            },

            getaddtocart(){
             let cart;
             if (localStorage.getItem('carts') == null) {
               cart = [] 
             } else {
               cart = JSON.parse(localStorage.getItem('carts', 'cartsNum'));
             }
             return cart;
            },

            getaddallfoods(){
             let food;
             if (localStorage.getItem('foods') == null) {
               food = [] 
             } else {
               food = JSON.parse(localStorage.getItem('foods'));
             }
             return food;
            },

        addtocart(ty){
          this.subtract = ty.food_quantity - this.quantity;
          console.log(this.subtract);
          ty.food_quantity = this.subtract;
          console.log(ty.food_quantity);
          let r = ty.food_price.split(",");
          let t = r.join('')
          let total = this.quantity * t;
          var n = total.toLocaleString();
          this.mystore = {
            food_id: ty.food_id,
            food_name: ty.food_name,
            food_price: ty.food_price,
            food_quantity: this.quantity,
            food_picture: ty.food_picture,
            food_initialquantity: ty.food_quantity,
            food_total_row: total
          }
          // initial adding //
          var cart = this.getaddtocart();
          // var food = this.getaddallfoods();
          if(cart.find(p => p.food_id == ty.food_id)){
          //   if (cart) {
              let newobj = [{
            food_picture: ty.food_picture,
            food_price: ty.food_price,
            food_name: ty.food_name,
            food_id: ty.food_id,
            food_quantity: this.quantity,
            food_initialquantity: ty.food_quantity,
            food_total_row: n,
          }]
             cart = newobj;

          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatefoodtb.php', 
              {
                'id': ty.food_id,
              'quantity': ty.food_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=> console.log(err));

              var items = JSON.parse(localStorage.carts);
             for (var i = 0; i < items.length; i++) {
               if(ty.food_id === items[i].food_id){  
                  items[i].food_quantity = this.quantity; 
                  items[i].food_initialquantity = this.subtract
                  }
                 }
                localStorage.setItem("carts", JSON.stringify(items));
            console.log('Eureka!')
          }
          else{
            var tys = cart.push(this.mystore);
            this.quantity = '';
          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatefoodtb.php', 
              {
                'id': ty.food_id,
              'quantity': ty.food_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=>console.log(err))

           
            this.numbercart(tys);
           localStorage.setItem('carts', JSON.stringify(cart))
            localStorage.setItem('cartsNum', JSON.stringify(cart.length))
            localStorage.setItem('cartsNum2', '0')

           
          }
        },


        // addtocart(ty){
        // let {food_id, food_name, food_price, food_picture, food_quantity} = ty;
        // this.food = {food_id, food_name, food_price, food_picture, food_quantity};
        // },

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
        this.fetchallfoods();
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