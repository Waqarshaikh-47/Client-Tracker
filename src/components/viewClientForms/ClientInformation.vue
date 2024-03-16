<template>
  <div class="container mt-5">
    <h1>Client Information</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Full Name:</strong> {{ clientInformationData.fullName }}</p>
      <p>
        <strong>PAN Card Number:</strong> {{ clientInformationData.panNumber }}
      </p>
      <p><strong>Date of Birth:</strong> {{ clientInformationData.dob }}</p>
      <p><strong>Email Address:</strong> {{ clientInformationData.email }}</p>
      <p><strong>Phone Number:</strong> {{ clientInformationData.phone }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input
          v-model="clientInformationData.fullName"
          type="text"
          class="form-control"
          id="fullName"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="panNumber" class="form-label">PAN Card Number</label>
        <input
          v-model="clientInformationData.panNumber"
          type="text"
          class="form-control"
          id="panNumber"
          placeholder="Enter your PAN card number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <input
          v-model="clientInformationData.dob"
          type="date"
          class="form-control"
          id="dob"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input
          v-model="clientInformationData.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          v-model="clientInformationData.phone"
          type="tel"
          class="form-control"
          id="phone"
          placeholder="Enter your phone number"
          required
        />
      </div>
    </form>
    <div class="d-flex justify-content-between mt-4 mb-4">
      <button @click="toggleEditMode" class="btn btn-primary">
        {{ isEditing ? "Save" : "Edit" }}
      </button>
    </div>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { ClientInformation } from "@/schemas/forms/ClientInformation";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const clientInformationData = ref(new ClientInformation());
const isEditing = ref(false);

const submitForm = () => {
  store.commit("setClientInformationFormData", clientInformationData.value);
  emit("next-step");
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // Reset form data if cancelling edit mode
    clientInformationData.value = new ClientInformation();
  }
};

const previousButton = () => {
  emit("prev-step");
};

// Fetch initial client information data or set from store
// This assumes you have a method to fetch the data, like an API call or Vuex action
const fetchClientInformation = () => {
  // Simulated data for example
  clientInformationData.value.fullName = "John Doe";
  clientInformationData.value.panNumber = "ABCDE1234F";
  clientInformationData.value.dob = "1990-01-01";
  clientInformationData.value.email = "johndoe@example.com";
  clientInformationData.value.phone = "1234567890";
};

fetchClientInformation();
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
