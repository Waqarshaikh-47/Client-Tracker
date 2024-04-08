<template>
  <div class="background-image">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="welcome-message">
            <h1>Welcome to GrowSmart Finserv!</h1>
            <p>We are glad to have you here.</p>
          </div>
        </div>
      </div>
      <template v-if="roles && (roles.includes('Write') || roles.includes('Admin'))">
        <div class="row">
          <div class="col-md-6" @click="$router.push({name:'new-client'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-person-plus-fill text-success"></i> New Client</h5>
                <p class="card-text">Add a new client here.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6" @click="$router.push({name:'clients'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-people-fill text-primary"></i> View Clients</h5>
                <p class="card-text">View all clients here.</p>
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
                <h5 class="card-title"><i class="bi bi-person-plus-fill text-success"></i> Add New User</h5>
                <p class="card-text">Add agent that could fill data</p>
              </div>
            </div>
          </div>
          <div class="col-md-6" @click="$router.push({name:'users'})">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-people-fill text-primary"></i> View Users</h5>
                <p class="card-text">List all users</p>
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
import { getAuth, signOut, type Auth } from 'firebase/auth';

const store = useStore()
const roles = ref<string[]>([])

const handleSignout = () => {
  let auth: Auth = getAuth();
  signOut(auth).then(() => {
    alert("Please contact the administrator for website access permissions.")
    router.push({ name: 'home' })
  })
}

onMounted(async () => {
  let userData = store.state.user;
  store.commit('setLoading', true)
  const userRoleData = await queries.fetchUserDataByEmail(userData.email);
  store.commit('setLoading', false)
  if (userRoleData[0] && userRoleData[0].roles && (userRoleData[0].roles.includes("Admin") || userRoleData[0].roles.includes("Write"))) {
    userData.roles = userRoleData[0].roles;
    userData.displayName = userRoleData[0].displayName;
    store.commit('setUser', userData);
    roles.value = userData.roles;
  } else {
    handleSignout()
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
  color: #198754;
}

.card {
  margin: 20px auto;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #adb5bd;
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

.bi {
  vertical-align: text-bottom;
  margin-right: 5px;
}

.text-success {
  color: #198754;
}

.text-primary {
  color: #198754 !important;
}
</style>
