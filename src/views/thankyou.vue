<template>
    <div>

<div class="container">

       <div class="row mx-auto mt-5">

  <v-card
    class="mx-auto"
    max-width="444"
 
  >
    <v-list-item three-line>
      <v-list-item-content>

        <div class="overline"  v-for="user in fooduser" :key="user.user_id">
          <div v-if="usery == user.user_id">
            <p style="letter-spacing: 2px; color: red"> {{user.name}}   {{user.username}}</p>
          </div>
        </div>

      <div class="row mx-auto mb-3">
          <h5 class="text-center ml-5"> RECEIPT OF PAYMENT</h5>
      </div>  
       </v-list-item-content> 
    </v-list-item>
          
         <table class="table">

        <tbody v-for="hist in userhistory" :key="hist.table_id">

             <tr v-if="usery == hist.user_id">


              <td>{{hist.food_name}}</td>
              <td>{{hist.food_quantity}}</td>
              <td>{{hist.food_price}}</td>
              <td>{{hist.food_price.split(",").join('') * hist.food_quantity}}</td>


             </tr>

        </tbody>

         </table>
         <h5 class="float-right m-3 mr-5">TOTAL = <span>N{{total}} </span> </h5><br>
         <h5 class="float-right m-4">PAID <span>N<b class="text-danger">{{total}}</b> </span> </h5>

         <p style="letter-spacing: 3px" class="text-center m-4">Thank you! Enjoy!</p>
  </v-card>


       </div>
         <router-link to="/"> <p class="text-center m-4" > <v-btn style="background: none; box-shadow: none">Countinue shopping</v-btn></p></router-link>

</div>

    </div>

</template>


 
   

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Thankyou',
    data(){
        return {
          usery: this.$route.params.id,

        }
    },

    computed:{
        ...mapGetters(['fooduser', 'userhistory']),

         total () {
    //    if(!this.userhistory){
    //      return 0;
    //    } else{
    // return this.userhistory.reduce( (acc, crypt) => {
    //   return acc + (crypt.food_price.split(",").join('') * crypt.food_quantity.toLocaleString())
    // }, 0)
    //    }
      let e = JSON.parse(localStorage.total)
      return e;
  }
    },

    methods: {
      ...mapActions(['myusers', 'userhistories'])
    },

    mounted(){
        setTimeout(() => {
         localStorage.removeItem('cartsNum')
         localStorage.removeItem('cartsNum2')
         localStorage.removeItem('drinkcarts')
         localStorage.removeItem('carts')
         localStorage.removeItem('customerpayment')

      }, 2000);
    },

    created(){
      console.log(this.usery);
      this.myusers();
      this.userhistories();
    }

}
</script>