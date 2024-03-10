<template>
  <div class="background-image">
    <div class="row">
      <div class="col">
        <div class="welcome-message">
          <h1>Welcome to Our Website!</h1>
          <p>We are glad to have you here.</p>
          <p class="mt-3 text-success">data from firebase </p>

          <div class="d-flex justify-content-center" v-for="user in users" :key="user">
            {{ user }}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" @click="$router.push({ name: 'new-client' })">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">New Client</h5>
            <p class="card-text">This is the first card.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6"  @click="$router.push({name:'clients'})">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">View Clients</h5>
            <p class="card-text">This is the second card.</p>
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
  /* background-image: url('https://www.theforage.com/blog/wp-content/uploads/2022/07/investment-banking-companies.jpg'); */
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.welcome-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #060404;
}

.card {
  width: 300px;
  margin: 20px auto;
}
</style>