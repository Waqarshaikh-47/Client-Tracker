<template>
  <div class="container mt-5">
    <h1>Fixed Deposit Details</h1>
    <div class="text-end" v-if="allForms.length">
      <button class="btn btn-primary" @click="addNewForm">
        {{ isAddNewForm ? "Save" : "Add New Form" }}
      </button>
    </div>
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
    <div class="d-flex justify-content-between mt-4 mb-4" v-if="!isAddNewForm">
      <button @click="toggleEditMode" class="btn btn-primary">
        {{ isEditing ? "Save" : "Edit" }}
      </button>
    </div>
    <ul class="list-group mt-3 container" v-if="allForms.length">
      <li
        @click="setCurrentForm(form, formIndex)"
        v-for="(form, formIndex) in allForms"
        :key="formIndex + 'fromList'"
        class="list-group-item custom-list-item"
        :class="{ active: currentFormIndex === formIndex }"
      >
        <i class="bi bi-journal"></i>  {{ form.name }}
      </li>
    </ul>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { FixedDepositDetails } from "@/schemas/forms/FixedDeposit";
import queries from '@/plugins/db/queries/quries';
import { cloneDeep, isArray } from "lodash";
import router from "@/router";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const fixedDepositFormData = ref(new FixedDepositDetails());
const isEditing = ref(false);
const isAddNewForm = ref(false);
const currentFormInfo = ref({});
const currentFormIndex = ref(0);

const allForms = ref(
  isArray(store.state.viewClientData.clientData.fixedDepositFormData)
    ? store.state.viewClientData.clientData.fixedDepositFormData
    : []
);
const updateClientsData = async() => {
  store.commit('setLoading',true)
  try {
    let clientId = store.state.viewClientData.id;
    let formParamsData = cloneDeep(allForms.value);
    let currentFormParamsData = cloneDeep(fixedDepositFormData.value);
    if (isAddNewForm.value) {
      formParamsData.push({ ...currentFormParamsData });
    } else {
      formParamsData[currentFormIndex.value] = { ...currentFormParamsData };
    }
    const data = {
      fixedDepositFormData: formParamsData,
      lastUpdated: Date(),
    }
    await queries.updateClientInformationData(clientId,data);
    isAddNewForm.value = false;
    isEditing.value = false;
    store.commit('setLoading',false)
    router.push({ name: "clients" });
  } catch (error) {
    alert("Error updating client data:", error);
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
const setCurrentForm = (form, formIndex) => {
  currentFormInfo.value = form;
  currentFormIndex.value = formIndex;
  fetchFixedDepositData();
};


// Fetch initial fixed deposit data or set from store
const fetchFixedDepositData = () => {
  // Simulated data for example
  fixedDepositFormData.value = new FixedDepositDetails(
    currentFormInfo.value.name ? currentFormInfo.value.name : '',
    currentFormInfo.value.investmentAmount ? currentFormInfo.value.investmentAmount : '',
    currentFormInfo.value.annualInterestRate ? currentFormInfo.value.annualInterestRate : '',
    currentFormInfo.value.startDate ? currentFormInfo.value.startDate : '',
    currentFormInfo.value.tenure ? currentFormInfo.value.tenure : ''
  );
};

const initializeCurrentForm = () => {
  if (allForms.value.length) {
    currentFormInfo.value = allForms.value[0];
    fetchFixedDepositData();
  } else {
    currentFormInfo.value = {};
    fetchFixedDepositData();
  }
};

initializeCurrentForm();

const addNewForm = () => {
  if (!isAddNewForm.value) {
    currentFormInfo.value = {};
    fetchFixedDepositData();
    isEditing.value = true;
    isAddNewForm.value = true;
  } else {
    updateClientsData();
  }
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

.custom-list-item {
  background-color: #343a40; /* Dark background color */
  color: white; /* Text color */
  border-color: #343a40; /* Border color */
}

.custom-list-item:hover {
  background-color: #495057; /* Darker background color on hover */
}

.custom-list-item.active {
  background-color: #6f6f6f; /* Active background color */
  color: white; /* Active text color */
  border-color: #212529; /* Active border color */
}
</style>
