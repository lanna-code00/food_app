<template>
    <div class="mycontainer">
      <div class="container-fluid">
  <div class="row justify-content-center">
<Addfood/>
</div>
<v-simple-table fixed-header
    height="500px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
             #
          </th>
          <th class="text-center">
            Time
          </th>
          <th class="text-center">
           Date
          </th>
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
            Detail
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
         v-for="food in allfoods" 
         :key="food.food_id"
        >
          <td class="text-center">{{ food.food_id }}</td>
          <td class="text-center">{{ food.food_time.slice(0,2)%12 }} {{ food.food_time.slice(-3)}} <small v-if="food.food_time.slice(0,2)>=12">pm</small> <small v-else>am</small></td>
          <td class="text-center">{{food.food_date}}</td>
          <td class="text-center">{{food.food_name}}</td>
          <td class="text-center">{{food.food_price}}</td>
          <td class="text-center">{{food.food_quantity}}</td>
          <td class="text-center">{{food.food_detail}}</td>
          <td class="text-center"><img :src="require(`../assets/food_php/uploads/${food.food_picture}`)" style="width: 50px; height: 50px; border: 2px solid black" alt="hello" srcset=""></td>
          <td>
             <button data-toggle="modal" data-target="#editfoodModal" @click="editfood(food)" class="btn btn-dark btn-sm">Edit</button>
          </td>
          <td>
             <button class="btn btn-danger btn-sm" @click="delete_food(food.food_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


  <!-- <div class="modal fade" id="editfoodModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">EDIT FOOD</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <div class="input-group mb-3 mt-2" hidden>
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-clock-o"></i></span>
           </div>
           <input type="text" hidden v-model="foods.food_id" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">
        </div>

         <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-clock-o"></i></span>
           </div>
           <input type="time" v-model="foods.food_time" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-clock-o"></i></span>
           </div>
           <input type="date" v-model="foods.food_date" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">
        </div>

        <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-info"></i></span>
           </div>
           <input type="text" v-model="foods.food_name" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">
        </div>

         <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-dollar"></i></span>
           </div>
           <input type="text" v-model="foods.food_price" class="form-control" placeholder="price" aria-label="price" aria-describedby="basic-addon1">
        </div>

         <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-sort-amount-asc"></i></span>
           </div>
           <input type="text" v-model="foods.food_quantity" class="form-control" placeholder="quantity" aria-label="quantity" aria-describedby="basic-addon1">
        </div>

         <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-info"></i></span>
           </div>
           <input type="text" v-model="foods.food_detail" class="form-control" placeholder="detail" aria-describedby="basic-addon1">
        </div>

     <div>
         <label for="Is food available?">Is food available ?</label>
       <select name="" v-model="foods.food_availability" id="" style="border: 1px solid black" class="col-md-12">
         <option value="Yes">Yes</option>
         <option value="No">No</option>
       </select>
     </div>
  

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button"  data-dismiss="modal" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> -->




<div class="modal fade" id="editfoodModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Food</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <input type="text" hidden v-model="foods.food_id" class="form-control" placeholder="time" aria-label="time" aria-describedby="basic-addon1">


               <v-text-field
              label="Time"
              filled
              prepend-icon=""
              v-model="foods.food_time"
              type="date"
             ></v-text-field>

               <v-text-field
              label="Date"
              filled
              type="text"
              v-model="foods.food_date"
              prepend-icon=""
             ></v-text-field>

              <v-text-field
              label="Name"
              filled
              type="text"
              v-model="foods.food_name"
              prepend-icon=""
             ></v-text-field>

             <v-text-field
              label="Price"
              filled
              type="text"
              v-model="foods.food_price"
              prepend-icon=""
             ></v-text-field>

             <v-text-field
              label="Quantity"
              filled
              type="text"
              v-model="foods.food_quantity"
              prepend-icon=""
             ></v-text-field>

             <v-text-field
              label="Detail"
              filled
              type="text"
              v-model="foods.food_detail"
              prepend-icon=""
             ></v-text-field>


      </div>
      <div class="modal-footer">
        <v-btn type="button" class="btn btn-secondary" data-dismiss="modal"><span class="fa fa-times fa-2x text-danger"></span></v-btn>
        <v-btn type="submit" class="btn btn-primary" @click="submitupdate(foods)"><span class="fa fa-check fa-2x text-success"></span></v-btn>
      </div>
    </div>
  </div>
</div>





<!-- <Editfood/> -->
</div>
    </div>
</template>

<script>
import Addfood from '../views/addfood';
// import Editfood from '../views/editfood';
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';
import Axios from 'axios';
export default {
    name: 'Foodtable',
    components:{
        Addfood,
        // Editfood,
    },

    data(){
     return {
         foods: {
           
           },
     }
    },
      computed: mapGetters(['allfoods']),

    methods: {
       ...mapActions(['fetchallfoods', 'updatefood']),

      submitupdate(ty) {
          console.log(ty);
             var myupdate = {
                 'food_id': ty.food_id,
                 'food_time': ty.food_time,
                 'food_date': ty.food_date,
                 'food_name': ty.food_name,
                 'food_price': ty.food_price,
                 'food_quantity': ty.food_quantity,
                 'food_detail': ty.food_detail,
               }
          Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatefood.php', myupdate)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));   
       },

         editfood(food){
           console.log(food);

             let {food_id, food_time, food_date, food_name, food_price,
                 food_quantity, food_detail, food_availability} = food;
            
            this.foods = {food_id,food_time, food_date, food_name, food_price,
            food_quantity, food_detail, food_availability};
         },

         delete_food(food_id){
           let r = this.allfoods.splice(food_id, 1);
           console.log(r);
           Axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/deletefoodtableitem.php',
            {
            'id': food_id
            }
           ).then(response => console.log(response.data)).catch(err => console.log(err))
         },

            readURL(event){
              this.foods.food_picture = event.target.files[0];
        // console.log(this.foods.file)
        if (this.foods.food_picture) {
          var reader = new FileReader();
                reader.onload = function (e) {
                  $('#image').attr('src', e.target.result);
                };

                reader.readAsDataURL(event.target.files[0]);
            }
      },
    },


    created(){
      this.fetchallfoods()
    }
}
</script>

<style scoped>
   .mycontainer{
     background-image: url('../assets/rice_nuggets.jpg');
     /* width: 100%; */
     height: 120vh;
     background-size: cover;
   }
</style>
         <!-- <div class="col-md-6" v-if="foods.food_picture">
           <img id="image" :src="require(`../assets/food_php/uploads/${foods.food_picture}`)" alt=" --food image" style="width: 50px; height: 50px"/>
         </div> 

         <div class="input-group mb-3 mt-2">
           <div class="input-group-prepend">
             <span class="input-group-text" style="background: none" id="basic-addon1">
              <i class="fa fa-picture-o"></i></span>
           </div>
           <input type="file" ref="file" v-on:change="readURL($event)" class="form-control" placeholder="picture" aria-label="picture" aria-describedby="basic-addon1">
        </div>
         -->