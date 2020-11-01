<template>
  <div>
  
   <div class="mt-5 mb-4 row justify-content-center">

  <button data-toggle="modal" data-target="#exampleModalCenter" style="width: 300px; height: 50px" class="btn btn-success">ADD FOOD</button>

<form @submit="onSubmit">
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="exampleModalLongTitle">Food Panel</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <v-text-field
              label="Name"
              filled
              v-model="foods.food_time"
              prepend-icon=""
              type="time"
             ></v-text-field>

               <v-text-field
              label="Price"
              filled
              prepend-icon=""
              v-model="foods.food_date"
              type="date"
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

             <div class="col-md-6">
                <img id="image" src="" alt="--food image" style="width: 50px; height: 50px"/>
             </div>

           <input type="file"   ref="file" v-on:change="readURL($event)" class="form-control" placeholder="picture" aria-label="picture" aria-describedby="basic-addon1">

        


      </div>
      <div class="modal-footer">
        <v-btn type="button" class="btn btn-secondary" data-dismiss="modal"><span class="fa fa-times fa-2x text-danger"></span></v-btn>
        <v-btn type="submit" class="btn btn-primary"><span class="fa fa-check fa-2x text-success"></span></v-btn>
      </div>
    </div>
  </div>
</div>
</form>


</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import $ from 'jquery';
let myid = 1;
export default {
  name: 'Addfood',
  data(){
    return {
     foods:{
        file: [], 
        // food_newid: myid++,
        food_time: '',
        food_date: '',
        food_name: '',
        food_price: '',
        food_quantity: '',
        food_detail: '',
       }, 
      foodarr: [],
    }
  },

  methods:{
    ...mapActions(['addfood', 'fetchallfoods']),
    onSubmit(e){
      e.preventDefault();
      let formData = new FormData();
        // formData.append('myid', myid++);
        formData.append('mytime', this.foods.food_time);
        formData.append('mydate', this.foods.food_date);
        formData.append('myname', this.foods.food_name);
        formData.append('myprice', this.foods.food_price);
        formData.append('myquantity', this.foods.food_quantity);
        formData.append('mydetail', this.foods.food_detail);
        formData.append('myfile', this.foods.file);

       let myobjoffoods = {
         id: myid++,
         time: this.foods.food_time,
         date: this.foods.food_date,
         name: this.foods.food_name,
         price: this.foods.food_price,
         quantity: this.foods.food_quantity,
         detail: this.foods.food_detail,
         file: this.foods.file,
       }
        this.foodarr.push(myobjoffoods);
        console.log(this.foodarr);
        localStorage.setItem('foods', JSON.stringify(this.foodarr));
        
      this.addfood(formData);
      this.foods.food_time = "";
      this.foods.food_date = "";
      this.foods.food_name = "";
      this.foods.food_price = "";
      this.foods.food_quantity = "";
      this.foods.food_detail = "";
      this.foods.file = "";

      // this.fetchallfoods();
    },

       readURL(event){
        this.foods.file = event.target.files[0];
        // console.log(this.foods.file)
        if (this.foods.file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image').attr('src', e.target.result);
                };

                reader.readAsDataURL(event.target.files[0]);
            }
      },
  },



}
</script>
