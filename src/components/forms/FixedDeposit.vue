<template>
  <div class="container mt-5">
    <h1>Fixed Deposit Details</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="fixedDepositFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentAmount" class="form-label"
          >Investment Amount</label
        >
        <input
          v-model="fixedDepositFormData.investmentAmount"
          type="number"
          class="form-control"
          id="investmentAmount"
          placeholder="Enter investment amount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="annualInterestRate" class="form-label"
          >Annual Rate of Interest (%)</label
        >
        <input
          v-model="fixedDepositFormData.annualInterestRate"
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
          v-model="fixedDepositFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px;"
        />
      </div>
      <div class="mb-3">
        <label for="tenure" class="form-label"
          >Tenure (in months or years)</label
        >
        <input
          v-model="fixedDepositFormData.tenure"
          type="number"
          class="form-control"
          id="tenure"
          placeholder="Enter tenure"
          required
        />
        <small id="tenureHelp" class="form-text text-muted"
          >Enter the number of months or years for the tenure.</small
        >
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
          {{ isLastForm ? "Save & Continue" : "Next" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { useStore } from 'vuex';
import { FixedDepositDetails } from "@/schemas/forms/FixedDeposit";
import queries from '@/plugins/db/queries/quries';

const store = useStore()
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const fixedDepositFormData = new FixedDepositDetails();

const updateClientsData = async() => {
  try {
    let clientId = store.state.clientId;
    const data = {
      fixedDepositFormData: { ...fixedDepositFormData },
      lastUpdated: Date(),
      fillerInfo: {
        name: store.state.user.displayName,
        email: store.state.user.email,
      }
    }
    await queries.updateClientInformationData(clientId,data);
  } catch (error) {
    console.error("Error updating client data:", error);
    throw error;
  }
}

const submitForm = async() => {
  try {
    store.commit('setLoading', true);
    store.commit("setFixedDepositFormData", fixedDepositFormData);
    await updateClientsData();
    store.commit('setLoading', false);
      emit("next-step");
  } catch (error) {
    console.error("Error submitting form:", error);
    store.commit('setLoading', false);
    throw error;
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
