<template>
  <div class="container mt-5">
    <h1>Client Information</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input v-model="clientInformationData.fullName" type="text" class="form-control" id="fullName" placeholder="Enter your full name"
          required>
      </div>
      <div class="mb-3">
        <label for="panNumber" class="form-label">PAN Card Number</label>
        <input v-model="clientInformationData.panNumber" type="text" class="form-control" id="panNumber"
          placeholder="Enter your PAN card number" required>
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <input v-model="clientInformationData.dob" type="date" class="form-control" id="dob" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input v-model="clientInformationData.email" type="email" class="form-control" id="email" placeholder="Enter your email address"
          required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input v-model="clientInformationData.panNumber" type="tel" class="form-control" id="phone" placeholder="Enter your phone number"
          required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref, onBeforeUnmount,onMounted } from 'vue';
import { ClientInformation } from '@/schemas/forms/ClientInformation'; // Adjust the path as per your project structure
const clientInformationData = new ClientInformation();

onMounted(() => {
  console.log(clientInformationData);
})
onBeforeUnmount(() => {
  console.log("store this in vuex",clientInformationData);

})
</script>