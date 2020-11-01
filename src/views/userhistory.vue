
    
  <!-- <div>

   

      <div>
         <h1 class="text-center">HISTORY PAGE</h1>


           <div v-for="hist in userhistory" :key="hist.table_id">
              <div v-if="used == hist.user_id">
                   <p>{{hist.food_name}}</p>
              </div>
           </div>
      </div>




  </div> -->

  <template>

  <div>
     <v-card
    
    style="background-color: #CE93D8"
    height="100px"
  >
    <v-toolbar extended>


      <v-btn icon >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon class="float-right">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

    </v-toolbar>
  </v-card>
    <div class="container">
  <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
             Date
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Quantity
          </th>
          <th class="text-left">
            Price
          </th>
           <th class="text-left">
            Total
          </th>
           <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-for="hist in userhistory" :key="hist.table_id">
        <tr v-if="used == hist.user_id">
          <td>{{ hist.food_date }}</td>
          <td>{{ hist.food_name }}</td>
          <td>{{ hist.food_quantity }}</td>
          <td>N{{ hist.food_price}}</td>
          <td>N{{ hist.food_quantity * hist.food_price.split(',').join('')}}</td>
          <td> <v-btn>  <v-icon>mdi-delete</v-icon> </v-btn> </td>
          
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
  </div>
</template>





<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Userhistory',
  data(){
    return {
      used: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters(['userhistory'])
  },

  methods: {
    ...mapActions(['userhistories'])
  },

  created(){
    this.userhistories();
    console.log(this.used)
  }

}
</script>