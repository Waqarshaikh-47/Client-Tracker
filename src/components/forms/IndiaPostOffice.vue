<template>
  <div class="container mt-5">
    <h1>INDIA POST OFFICE</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="indiaPostFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="annualInterestRate" class="form-label"
          >Annual Rate of Interest (%)</label
        >
        <input
          v-model="indiaPostFormData.annualInterestRate"
          type="number"
          class="form-control"
          id="annualInterestRate"
          placeholder="Enter annual rate of interest"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input
          v-model="indiaPostFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="tenure" class="form-label">Tenure End Date</label>
        <input
          v-model="indiaPostFormData.tenureEndDate"
          type="date"
          class="form-control"
          id="tenureEndDate"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="compoundingFrequency" class="form-label"
          >Interest Compounding Frequency</label
        >
        <select
          v-model="indiaPostFormData.compoundingFrequency"
          class="form-select"
          id="compoundingFrequency"
          required
        >
          <option value="" disabled selected>
            Select compounding frequency
          </option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4">
        <button
          :disabled="legIndex == 0"
          @click.prevent="previousButton"
          type="button"
          class="btn btn-secondary"
        >
          Previous
        </button>
        <button type="submit" class="btn btn-primary">
         Save & Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { useStore } from 'vuex';
import { IndiaPostOfficeDetails } from "@/schemas/forms/IndiaPostOfficeDetails";
import queries from '@/plugins/db/queries/quries';

const store = useStore()
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const indiaPostFormData = new IndiaPostOfficeDetails();

const updateClientsData = async() => {
  try {
    let clientId = store.state.clientId;
    const data = {
      indiaPostFormData: { ...indiaPostFormData },
      lastUpdated: Date(),
      fillerInfo: {
        name: store.state.user.displayName,
        email: store.state.user.email,
      }
    }
    await queries.updateClientInformationData(clientId,data);
  } catch (error) {
    alert("Something went wrong. Please try again.");
    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
  }
}

const submitForm = async() => {
  try {
    store.commit('setLoading', true);
    store.commit("setIndiaPostFormData", indiaPostFormData);
    await updateClientsData();
    store.commit('setLoading', false);
    emit("next-step");
  } catch (error) {
    store.commit('setLoading', false);
    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
  }
};

const previousButton = () => {
  emit("prev-step");
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
