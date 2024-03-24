<template>
  <div class="container mt-5">
    <h1>Fixed Deposit Details</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ fixedDepositFormData.name }}</p>
      <p>
        <strong>Investment Amount:</strong>
        {{ fixedDepositFormData.investmentAmount }}
      </p>
      <p>
        <strong>Annual Rate of Interest (%):</strong>
        {{ fixedDepositFormData.annualInterestRate }}
      </p>
      <p><strong>Start Date:</strong> {{ fixedDepositFormData.startDate }}</p>
      <p><strong>Tenure:</strong> {{ fixedDepositFormData.tenure }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else>
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
          style="max-width: 200px"
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
import { useStore } from "vuex";
import { FixedDepositDetails } from "@/schemas/forms/FixedDeposit";
import queries from '@/plugins/db/queries/quries';

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const fixedDepositFormData = ref(new FixedDepositDetails());
const isEditing = ref(false);
const currentFormInfo = store.state.viewClientData.clientData.fixedDepositFormData;


const updateClientsData = async() => {
  store.commit('setLoading',true)
  try {
    let clientId = store.state.viewClientData.id;
    const data = {
      fixedDepositFormData: { ...fixedDepositFormData.value },
      lastUpdated: Date(),
    }
    await queries.updateClientInformationData(clientId,data);
    store.commit('setLoading',false)
  } catch (error) {
    console.error("Error updating client data:", error);
    store.commit('setLoading',false)

    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
    throw error;
  }
}

const toggleEditMode = () => {
  if (isEditing.value) {
    updateClientsData()
  }
  isEditing.value = !isEditing.value;

};


// Fetch initial fixed deposit data or set from store
const fetchFixedDepositData = () => {
  // Simulated data for example
  fixedDepositFormData.value = new FixedDepositDetails(
    currentFormInfo.name ? currentFormInfo.name : '',
    currentFormInfo.investmentAmount ? currentFormInfo.investmentAmount : '',
    currentFormInfo.annualInterestRate ? currentFormInfo.annualInterestRate : '',
    currentFormInfo.startDate ? currentFormInfo.startDate : '',
    currentFormInfo.tenure ? currentFormInfo.tenure : ''
  );
};

fetchFixedDepositData();
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
