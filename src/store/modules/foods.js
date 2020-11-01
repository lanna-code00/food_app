import axios from 'axios';

const state = {
    foods: [],
    cart: '',
    val: '',
    cart2: '',
    newcart: [],
    mylocalcart: [],
    arrayfromdb: '',
    users: [],
    foodusers: [],
    history: [],
    drinks: [],
    detail: [],
    admin: [],
};



// GETTERS STARTS //


const getters = {
    allfoods: state => state.foods,
    allcarts: state => state.cart,
    allcarts2: state => state.cart2,
    allcartsfromlocal: state => state.mylocalcart,
    newcarts: state => state.newcart,
    totalarrayindb: state => state.arrayfromdb,
    allusers: state => state.users,
    fooduser: state => state.foodusers,
    userhistory: state => state.history,
    alldrinks: state => state.drinks,
    details: state => state.detail,
    admins: state => state.admin,
};

// GETTERS ENDS //




// ACTIONS STARTS///


const actions = {
   async fetchallfoods({ commit }) {
       const response = await axios.get(
        'http://localhost/vuefolder/vueInvent/src/assets/food_php/getfood.php'
        );
      console.log(response.data);
      commit('allfoods', response.data)
   },

   async addfood({ commit }, formData) {
       const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/insertfood.php',
        formData,
        {
          headers: {
                    'Content-Type': 'multipart/form-data'
                }
        }
    );
       console.log(response.data);
       commit('insertfood', response.data)
   },

   async adddrinks({ commit }, formData) {
    const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/adddrink.php',
     formData,
     {
       headers: {
                 'Content-Type': 'multipart/form-data'
             }
     }
 );
    console.log(response.data);
    commit('insertdrink', response.data)
},

   async fetchalldrinks({ commit }) {
    const response = await axios.get(
     'http://localhost/vuefolder/vueInvent/src/assets/food_php/getdrinks.php'
     );
   console.log(response.data);
   commit('alldrinks', response.data)
},

  async regadmin({ commit }, formData) {
    const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/adminreg.php',
     formData,
     {
       headers: {
                 'Content-Type': 'multipart/form-data'
             }
     }
 );
    console.log(response.data);
    commit('registeradmin', response.data)
},

async getalladmins({ commit }) {
    const response = await axios.get(
     'http://localhost/vuefolder/vueInvent/src/assets/food_php/getalladmin.php'
     );
   console.log(response.data);
   commit('alladmin', response.data)
},


   async myusers({ commit }) {
    const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/allusers.php');
    console.log(response.data);
    commit('myuser', response.data)
},

   getlocal({ commit }, val){
    val = localStorage.getItem('carts');
    console.log(val);
      commit('getall', val)
   },

async updatefood({commit}, myupdate) {
    const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/updatefood.php', 
    myupdate
    );
    console.log(response.data);
    commit('updatetable', response.data);
},   

async getallcart({ commit }) {
    const response = await axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getcart.php');
    console.log(response.data);
    commit('getcarts', response.data)
},

 numbercart({ commit }, val){
    val = localStorage.getItem('cartsNum');
    console.log(val);
      commit('numbers', val)
   },

   numbercart2({ commit }, val){
    val = localStorage.getItem('cartsNum2');
    console.log(val);
      commit('numbers2', val)
   },

 async get_total_number_of_arrays_from_db({commit}){
    const response = await axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/cartarray.php');
    console.log(response.data);
    console.log(state.totalarrayindb)
    commit('get_total_of_array', response.data)
 },
 
 async register({ commit }, newobj) {
    const response = await axios.post('http://localhost/vuefolder/vueInvent/src/assets/food_php/register.php', newobj);
    console.log(newobj)
    console.log(response.data);
    commit('registerusers', response.data)
},

 async userhistories({ commit }) {
    const response = await axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/history.php');
    console.log(response.data);
    console.log(state.history)
    commit('myhistory', response.data)
 },

 async getdetailsofbuyer({commit}){
     const res = await axios.get('http://localhost/vuefolder/vueInvent/src/assets/food_php/getuserdetail.php');
     console.log(res.data);
     commit('details', res.data)
 }

};


// ACTION STOPS....//




// MUTATION STARTS //


const mutations = {
    allfoods: (state, foods) => (state.foods = foods),
    alladmin: (state, admin) => (state.admin = admin),
    alldrinks: (state, drinks) => (state.drinks = drinks),
    details: (state, det) => (state.detail = det),
    myuser(state, foodused){
      state.foodusers = foodused;
      console.log(state.foodusers)
    },
    insertfood: (state, food) => state.foods.unshift(food),
    registeradmin: (state, admins) => state.admin.unshift(admins),
    insertdrink: (state, drink) => state.drinks.unshift(drink),
    numbers(state, val){
         state.cart = val;
     } ,
     numbers2(state, val){
        state.cart2 = val;
    } ,
     getall:(state, values) => (state.mylocalcart = values),
     getcarts: (state, vals) => (state.newcart = vals),
     get_total_of_array: (state, arrayfromdb) => (state.arrayfromdb = arrayfromdb),
     myhistory: (state, history) => (state.history = history),
     registerusers: (state, user) => (state.users = user),
    //  loginuser(user){
    //      if(user){
    //         console.log('not logged')
    //      }
    //      else{
    //          console.log('logged')
    //      }
    //  },
     updatetable(state, updating){
        let e = state.foods.findIndex(p =>{ return p.food_id });
        console.log(updating);
        console.log(e);
     }

};

// MUTATION STOPS //

export default {
    state,
    getters,
    actions,
    mutations,
}