<template>
  <div class="background-image">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="welcome-message">
            <h1>Welcome to Our Website!</h1>
            <p>We are glad to have you here.</p>
            <p class="mt-3 text-success">Data from Firebase</p>

            <div class="d-flex justify-content-center" v-for="user in users" :key="user">
              {{ user }}
            </div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import firestore from "@/plugins/db/fireBaseInit";
import { QuerySnapshot, doc } from "firebase/firestore";
import { ref, onMounted } from 'vue';

const users = ref<any[]>([]);

// Use async/await to properly handle asynchronous data fetching
const fetchData = async () => {
  try {
    const querySnapshot: any = await firestore.collection('users').get();
    querySnapshot.forEach((userDoc: any) => {
      users.value.push(userDoc.data());
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Call the fetchData function to fetch users when the component is mounted
onMounted(() => {
  fetchData();
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
