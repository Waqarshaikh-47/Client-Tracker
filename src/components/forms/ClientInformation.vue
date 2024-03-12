<template>
  <div class="container mt-5">
    <h1>Client Information</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input v-model="fullName" type="text" class="form-control" id="fullName" placeholder="Enter your full name"
          required>
      </div>
      <div class="mb-3">
        <label for="panNumber" class="form-label">PAN Card Number</label>
        <input v-model="panNumber" type="text" class="form-control" id="panNumber"
          placeholder="Enter your PAN card number" required>
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <input v-model="dob" type="date" class="form-control" id="dob" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email address"
          required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input v-model="phone" type="tel" class="form-control" id="phone" placeholder="Enter your phone number"
          required>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4">
          <button
            @click.prevent="previousButton"
            type="button"
            class="btn btn-secondary"
          >
            Previous
          </button>
          <button
          type="submit"
            class="btn btn-primary"
          >
            {{ true ? "Save & Continue" : "Next" }}
          </button>
        </div>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref, onMounted } from 'vue';
import { store } from "@/stores/store";
const emit = defineEmits(['next-step', 'prev-step'])

const fullName = ref('');
const panNumber = ref('');
const dob = ref('');
const email = ref('');
const phone = ref('');

const submitForm = () => {
  // Here you can handle form submission, such as sending data to backend, etc.
  // For this example, let's just log the form data
  let clientInformationFormData = {
    fullName: fullName.value,
    panNumber: panNumber.value,
    dob: dob.value,
    email: email.value,
    phone: phone.value
  }
  store.commit('setClientInformationFormData', clientInformationFormData)
  emit('next-step')

  // Reset form fields after submission
  
};
</script>

<style scoped>
.btn-primary {
  background-color: #3d444b;
  border-color: #3d444b;
}

.btn-primary:hover {
  background-color: #000000;
  border-color: #000000;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #5a6167;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6167;
}
</style>