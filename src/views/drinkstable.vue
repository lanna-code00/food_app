<template>
    
 <div class="mycontainer">
      <div class="container-fluid">
  <div class="row justify-content-center">
<Adddrinks/>
</div>
<v-simple-table fixed-header
    height="500px">
    <template v-slot:default>
      <thead>
        <tr>
         
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
           Price
          </th>
          <th class="text-center">
            Quantity
          </th>
          <th class="text-center">
          Picture
          </th>
          <th class="text-center">
            Edit
          </th>
          <th class="text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
         v-for="drink in alldrinks" 
         :key="drink.drink_id"
        >
          <td class="text-center">{{drink.drink_name}}</td>
          <td class="text-center">{{drink.drink_price}}</td>
          <td class="text-center">{{drink.drink_quantity}}</td>
          <td class="text-center"><img :src="require(`../assets/food_php/uploads/${drink.drink_picture}`)" style="width: 50px; height: 50px; border: 2px solid black" alt="hello" srcset=""></td>
          <td>
             <button data-toggle="modal" data-target="#editfoodModal" @click="editfood(drink)" class="btn btn-dark btn-sm">Edit</button>
          </td>
          <td>
             <button class="btn btn-danger btn-sm" @click="delete_food(drink.drink_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

<div class="modal fade" id="editfoodModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Drink</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <input type="text" hidden v-model="drinks.drink_id" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">


               <v-text-field
              label="Name"
              filled
              prepend-icon=""
              v-model="drinks.drink_name"
             ></v-text-field>

               <v-text-field
              label="Price"
              filled
              type="text"
              v-model="drinks.drink_price"
              prepend-icon=""
             ></v-text-field>

              <v-text-field
              label="Quantity"
              filled
              type="number"
              v-model="drinks.drink_quantity"
              prepend-icon=""
             ></v-text-field>

      </div>
      <div class="modal-footer">
        <v-btn type="button" class="btn btn-secondary" data-dismiss="modal"><span class="fa fa-times fa-2x text-danger"></span></v-btn>
        <v-btn type="submit" class="btn btn-primary" @click="submitupdate(drinks)"><span class="fa fa-check fa-2x text-success"></span></v-btn>
      </div>
    </div>
  </div>
</div>





<!-- <Editfood/> -->
</div>
    </div>
</template>


<script>
import { mapGetters, mapActions} from 'vuex'
import Axios from 'axios'
import Adddrinks from './adddrinks';
export default {
    name: 'drinkstable',
    data(){
     return {
         drinks: {},
     }
    },
    components: { Adddrinks },
    computed: mapGetters(['alldrinks']),
    methods: {
       ...mapActions(['fetchalldrinks', 'updatefood']),

       submitupdate(ty) {
          console.log(ty);
             var myupdate = {
                 'drink_id': ty.drink_id,
                 'drink_name': ty.drink_name,
                 'drink_price': ty.drink_price,
                 'drink_quantity': ty.drink_quantity,
               }
          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatedrink.php', myupdate)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));   
       },

         editfood(drinks){
           console.log(drinks);

             let {drink_id, drink_name, drink_price, drink_quantity} = drinks;
            
            this.drinks = {drink_id,drink_name, drink_price,drink_quantity};
         },

         delete_food(drink_id){
           let r = this.alldrinks.splice(drink_id, 1);
           console.log(r);
           Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/deletedrink.php',
            {
            'id': drink_id
            }
           ).then(response => console.log(response.data)).catch(err => console.log(err))
         },

    },
    created(){
        this.fetchalldrinks()
    }

}
</script>