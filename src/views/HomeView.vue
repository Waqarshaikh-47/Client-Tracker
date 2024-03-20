<template>
  <div class="background-image">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="welcome-message">
            <h1>Welcome to Our Website!</h1>
            <p>We are glad to have you here.</p>
          </div>
        </div>
      </div>
      <template v-if="roles && (roles.includes('Write') || roles.includes('Admin') )">
        <div class="row">
          <div class="col-md-6" @click="$router.push({name:'new-client'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">New Client</h5>
                <p class="card-text">This is the first card.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6" @click="$router.push({name:'clients'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">View Clients</h5>
                <p class="card-text">This is the second card.</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- Only for admin users -->
      <template v-if="roles && roles.includes('Admin')">
        <div class="row">
          <div class="col-md-6" @click="$router.push({name:'new-user'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Add New User</h5>
                <p class="card-text">add agent that could fill data</p>
              </div>
            </div>
          </div>
          <div class="col-md-6" @click="$router.push({name:'users'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">View Users</h5>
                <p class="card-text">list all users</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import queries from "@/plugins/db/queries/quries";
import router from "@/router";
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore()


const roles = ref<string[]>([])

// Use async/await to properly handle asynchronous data fetching

// Call the fetchData function to fetch users when the component is mounted
onMounted(async () => {
  let userData = store.state.user;
  const userRoleData = await queries.fetchUserDataByEmail(userData.email);
  console.log("userRoleData: ", userRoleData[0]);
  
  // Check the structure of userRoleData[0] to ensure it contains the expected properties
  if (userRoleData[0]) {
    // Update userData directly
    userData.roles = userRoleData[0].roles; // Assuming 'roles' is an array
    userData.displayName = userRoleData[0].displayName;
    store.commit('setUser', userData);
    console.log("userData: ", userData);
  
    // Update the roles ref value
    roles.value = userData.roles;
    console.log("roles",roles.value);
    
  }
});


</script>

<style scoped>
.background-image {
  background: linear-gradient(135deg, #000000, #434343);
  height: 100vh;
  padding: 60px 0;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

.welcome-message {
  text-align: center;
  color: #fff;
}

.card {
  margin: 20px auto;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1.1rem;
}

.text-success {
  color: #28a745;
}

</style>
