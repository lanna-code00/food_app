<template>
<div>
    <h4 class="mt-5 mb-4 text-center">USERS</h4>
  <v-simple-table
    fixed-header
    height="300px"
    class="container mt-5"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Username
          </th>
          <th class="text-left">
            E-mail
          </th>
          <th class="text-left">
            Phone
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in fooduser"
          :key="item.user_id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Userstable',
    computed: {
        ...mapGetters(['fooduser'])
    },
    methods: {
        ...mapActions(['myusers'])
    },
    
    created(){
        this.myusers();
        console.log(this.allusers)
    }
}
</script>