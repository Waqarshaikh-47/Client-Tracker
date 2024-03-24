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
          style="max-width: 200px"
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
import { cloneDeep } from "lodash";
import queries from '@/plugins/db/queries/quries';


const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const currentFormInfo = store.state.viewClientData.clientData.clientInformationFormData;
const clientInformationData = ref(new ClientInformation());
const isEditing = ref(false);

const submitForm = () => {
  // store.commit("setClientInformationFormData", clientInformationData.value);
  // emit("next-step");
};

const toggleEditMode = () => {
  if (isEditing.value) {
    let clientData = cloneDeep(store.state)
    updateClientsData()
    // Reset form data if cancelling edit mode
  }
  isEditing.value = !isEditing.value;

};


// Fetch initial client information data or set from store
// This assumes you have a method to fetch the data, like an API call or Vuex action
const fetchClientInformation = () => {
  // Simulated data for example
  clientInformationData.value = new ClientInformation(
    currentFormInfo.fullName,
    currentFormInfo.panNumber,
    currentFormInfo.dob,
    currentFormInfo.email,
    currentFormInfo.phone
  );
};
fetchClientInformation();


const updateClientsData = async() => {
  try {
    let clientId = store.state.viewClientData.id;
    const data = {
      clientInformationFormData: { ...clientInformationData.value },
      lastUpdated: Date(),
      fillerInfo: {
        name: store.state.user.displayName,
        email: store.state.user.email,
      }
    }
    await queries.updateClientInformationData(clientId,data);
  } catch (error) {
    console.error("Error updating client data:", error);
    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
    throw error;
  }
}

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
