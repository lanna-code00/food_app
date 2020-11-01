<template>

<div>
     
     <div class="mt-2 row justify-content-center">
         <i class="fa fa-shopping-cart fa-5x text-danger"><span style="font-size: 37px; color:#4A148C">My shoppings</span></i>
     </div>

  <v-simple-table  class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Food_picture
          </th>
           <th class="text-left">
            Price
          </th>
           <th class="text-left">
            Quantity
          </th>
           <th class="text-left">
            Total
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in localarray"
          :key="item.food_id"
          @click="addme(item)"
        >
          
          <td>{{ item.food_name }}</td>
          <td><img :src="require(`../assets/food_php/uploads/${item.food_picture}`)" style="width: 50px; height: 50px; border: 2px solid black" alt="hello" srcset=""></td>
          <td>N{{ item.food_price.split(",").join('') }}</td>
          <td><input type="number"  class="form-control" v-model="item.food_quantity" name="" id=""> </td>
          <td>N{{ item.food_price.split(",").join('') * item.food_quantity}}</td>
          <td> <v-btn @click="deletefood(item.food_id)"><i class="fa fa-trash"></i></v-btn></td>
        </tr>
      </tbody>

       <tbody>
        <tr
          v-for="item in dbdrinks"
          :key="item.drink_id"
          @click="addrinks(item)"
        >
          
          <td>{{ item.drink_name }}</td>
          <!-- <td></td> -->
          <td><img :src="require(`../assets/food_php/uploads/${item.drink_picture}`)" style="width: 50px; height: 50px; border: 2px solid black" alt="hello" srcset=""></td>
          <td>N{{ item.drink_price.split(",").join('') }}</td>
          <!-- <td>{{ item.food_quantity}}</td> -->
          <td><input type="number"  class="form-control" v-model="item.drink_quantity" name="" id=""> </td>
          <td>N{{ item.drink_price.split(",").join('') * item.drink_quantity}}</td>
          <td> <v-btn @click="deletedrink(item.drink_id)"><i class="fa fa-trash"></i></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-spacer>
   
  </v-spacer>
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
     <div class="modal-header">
        <p class="modal-title" id="exampleModalLongTitle">{{empty}}</p>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
    </div>
  </div>
</div>
   <h5 class="float-left mt-3 m-2">Items <span :style="{color: 'red'}">({{gettotaitems}})</span></h5>

   <h5 class="float-right mt-3 m-2">Total N<span :style="{color: 'red'}"> {{ total + total2 }}</span></h5>

    <div>
        <button @click="proceed()" data-toggle="modal" data-target="#exampleModalCenter" style="background:#4A148C;color: white" 
         class="fixed-bottom m-5 btn btn-danger"> Proceed to payment</button>
    </div>

  </div>

</template>

<script>
import Axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
// import $ from 'jquery'
export default {
    name: 'Addedtocart',
    data(){
        return{
          localarray: [],
        dbdrinks: [],
          newarr: '',
          empty: '',
          mystore:'',
          lastItem: {},
          a: [],
          ids:''
        }
    },

    computed: {
        ...mapGetters(['newcarts', 'allcartsfromlocal']),

        gettotaitems(){
          var items = JSON.parse(localStorage.cartsNum);
          var items2 = JSON.parse(localStorage.cartsNum2);
          return Number(items) + Number(items2)
        },

        // eslint-disable-next-line no-mixed-spaces-and-tabs
     total () {
       if(!this.localarray){
         return 0;
       } else{
    return this.localarray.reduce( (acc, crypt) => {
      return acc + (crypt.food_price.split(",").join('') * crypt.food_quantity.toLocaleString())
    }, 0)

       }
  },

  total2(){
    if (!this.dbdrinks) {
      return 0;
    } else {
      return this.dbdrinks.reduce((acc, crypt) => {
        return acc + (crypt.drink_price.split(",").join('') * crypt.drink_quantity.toLocaleString())
      }, 0)
    }
  }

    },

    methods: {
        ...mapActions(['getallcart']),

        getitemsfromlocalstorage(){
            let a = JSON.parse(localStorage.getItem('carts'))
             this.localarray = a;
             console.log(this.localarray)
        },
         getdrinksfromlocalstorage(){
            let a = JSON.parse(localStorage.getItem('drinkcarts'))
             this.dbdrinks = a;
             console.log( this.dbdrinks)
        },

        addme(ty){
          console.log(ty)
               var items = JSON.parse(localStorage.carts);
             for (var i = 0; i < items.length; i++) {
               if(ty.food_id === items[i].food_id){ 
                  items[i].food_quantity = ty.food_quantity; 
                  items[i].food_total_row = ty.food_price.split(",").join('') * ty.food_quantity;
                  
            Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatefoodtb.php', 
              {
                'id': ty.food_id,
              'quantity':  items[i].food_initialquantity - items[i].food_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=>console.log(err))
                  }
                        

                 }
                localStorage.setItem("carts", JSON.stringify(items));
          },

          
        addrinks(ty){
          console.log(ty)
               var items = JSON.parse(localStorage.drinkcarts);
             for (var i = 0; i < items.length; i++) {
               if(ty.drink_id === items[i].drink_id){ 
                  items[i].drink_quantity = ty.drink_quantity; 
                  items[i].food_total_row = ty.drink_price.split(",").join('') * ty.drink_quantity;
                  
            Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatedrinktb.php', 
              {
                'id': ty.drink_id,
              'quantity':  items[i].food_initialquantity - items[i].drink_quantity,
              }
          ).then(res => console.log(res.data))
            .catch(err=>console.log(err))
                  }
                        

                 }
                localStorage.setItem("drinkcarts", JSON.stringify(items));
          },


        proceed(){
            let a = JSON.parse(localStorage.getItem('carts'));
            console.log(a);
            this.ids = JSON.parse(localStorage.getItem('ids'));
            JSON.stringify(localStorage.setItem('total', this.total + this.total2))

            if (!this.ids) {
               this.$router.push("/login")
               
            } else{
               this.$router.push('/usersaddress/' + this.ids)
            }
        },

        deletefood(ty){
         var deletety = JSON.parse(localStorage.getItem('carts'))
         var deletetys = JSON.parse(localStorage.cartsNum)-1;
         let e = deletety.filter(p => p.food_id != ty)
         localStorage.setItem('carts', JSON.stringify(e))
         localStorage.setItem('cartsNum', JSON.stringify(deletetys))
        },

        deletedrink(tys){
          console.log(tys);
         var deletety = JSON.parse(localStorage.getItem('drinkcarts'))
         var deletetys = JSON.parse(localStorage.cartsNum2)-1;
         let e = deletety.filter(p => p.drink_id != tys)
         localStorage.setItem('drinkcarts', JSON.stringify(e))
         localStorage.setItem('cartsNum2', JSON.stringify(deletetys))
        },

    },

    created(){
        this.getitemsfromlocalstorage();
        this.getdrinksfromlocalstorage();

        this.getallcart();
        // this.getsumtotal();
    },
    // destroyed(){
    //   this.deletefood();
    // }
}
</script>
