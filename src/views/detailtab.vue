<template>
<div>
    <h4 class="mt-5 mb-4 text-center">USERS-INFORMATION</h4>
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
            Lastname
          </th>
          <th class="text-left">
            Phone
          </th>
          <th class="text-left">
            City
          </th>
          <th class="text-left">
            Address
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in details"
          :key="item.detail_id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.status }}</td>

        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Detailtab',
    computed: {
        ...mapGetters(['details'])
    },
    methods: {
        ...mapActions(['getdetailsofbuyer'])
    },
    
    created(){
        this.getdetailsofbuyer();
    }
}
</script>