<template>
  <div>
   

    <!-- Button trigger modal -->
    <div class="row justify-content-center mt-5">
<button type="button" class="btn btn-success text-light" data-toggle="modal" data-target="#exampleModalCenter">
 ADD DRINK
</button>
</div>
<!-- Modal -->
<form @submit="onSubmit">

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="exampleModalLongTitle">Drinks Panel</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <v-text-field
              label="Name"
              filled
              prepend-icon=""
              v-model="drinks.drink_name"
             ></v-text-field>

               <v-text-field
              label="Price"
              filled
              prepend-icon=""
              v-model="drinks.drink_price"
             ></v-text-field>

               <v-text-field
              label="Quantity"
              filled
              type="number"
              prepend-icon=""
              v-model="drinks.drink_quantity"
             ></v-text-field>

             <div class="col-md-6">
                <img id="image" src="" alt="--food image" style="width: 50px; height: 50px"/>
             </div>

           <input type="file" ref="file" v-on:change="readURL($event)" class="form-control" placeholder="picture" aria-label="picture" aria-describedby="basic-addon1">

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
</template>


<script>
import { mapActions } from 'vuex';
import $ from 'jquery'
let myid = 0;
  export default {
      name: 'Adddrinks',
    data () {
      return {
        drinks:{
        file: [], 
        drink_name: '',
        drink_price: '',
        drink_quantity: '',
       }, 
       drinkarr: [],
      }
    },

    methods: {
      ...mapActions(['adddrinks', 'fetchalldrinks']),
       readURL(event){
        this.drinks.file = event.target.files[0];
        // console.log(this.foods.file)
        if (this.drinks.file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image').attr('src', e.target.result);
                };

                reader.readAsDataURL(event.target.files[0]);
            }
      },

       onSubmit(e){
      e.preventDefault();
      let formData = new FormData();
        formData.append('myname', this.drinks.drink_name);
        formData.append('myprice', this.drinks.drink_price);
        formData.append('myquantity', this.drinks.drink_quantity);
        formData.append('myfile', this.drinks.file);

       let myobjofdrinks = {
         id: myid++,
         name: this.drinks.drink_name,
         price: this.drinks.drink_price,
         quantity: this.drinks.drink_quantity,
         file: this.drinks.file,
       }
        this.drinkarr.push(myobjofdrinks);
        console.log(this.drinkarr);
        localStorage.setItem('drinks', JSON.stringify(this.drinkarr));
        
      this.adddrinks(formData);
      this.drinks.drink_name = "";
      this.drinks.drink_price = "";
      this.drinks.drink_quantity = "";
      this.drinks.file= "";

      // this.fetchallfoods();
    },
    created(){
      this.fetchalldrinks()
    }

    }
  }
</script>