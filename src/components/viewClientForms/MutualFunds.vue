<template>
  <div class="container mt-5">
    <h1>Mutual Funds</h1>
    <div class="text-end" v-if="allForms.length">
      <button class="btn btn-primary" @click="addNewForm">
        {{ isAddNewForm ? "Save" : "Add New Form" }}
      </button>
    </div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ mutualFundFormData.name }}</p>
      <p><strong>Start Date:</strong> {{ mutualFundFormData.startDate }}</p>
      <p>
        <strong>Investment Type:</strong>
        {{ mutualFundFormData.investmentType }}
      </p>
      <p><strong>Company Name:</strong> {{ mutualFundFormData.companyName }}</p>
      <p>
        <strong>Investment Amount:</strong>
        {{ mutualFundFormData.investmentAmount }}
      </p>
      <p><strong>Remark:</strong> {{ mutualFundFormData.remark }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="mutualFundFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input
          v-model="mutualFundFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="investmentType" class="form-label">Investment Type</label>
        <select
          v-model="mutualFundFormData.investmentType"
          class="form-select"
          id="investmentType"
          required
        >
          <option value="" disabled selected>Select investment type</option>
          <option value="SIP">SIP</option>
          <option value="Lumpsum">Lumpsum</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="companyName" class="form-label">Company Name</label>
        <input
          v-model="mutualFundFormData.companyName"
          type="text"
          class="form-control"
          id="companyName"
          placeholder="Enter company name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentAmount" class="form-label"
          >Investment Amount</label
        >
        <input
          v-model="mutualFundFormData.investmentAmount"
          type="number"
          class="form-control"
          id="investmentAmount"
          placeholder="Enter investment amount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="remark" class="form-label">Remark</label>
        <textarea
          v-model="mutualFundFormData.remark"
          class="form-control"
          id="remark"
          rows="3"
          placeholder="Enter any remarks"
        ></textarea>
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
        <i class="bi bi-journal"></i> {{ form.companyName }}
      </li>
    </ul>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { MutualFundDetails } from "@/schemas/forms/MutualFundDetails";
import { useStore } from "vuex";
import queries from "@/plugins/db/queries/quries";
import { cloneDeep, isArray } from "lodash";
import { initializeAuth } from "firebase/auth";
import router from "@/router";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const mutualFundFormData = ref(new MutualFundDetails());
const isEditing = ref(false);
const isAddNewForm = ref(false);
const currentFormInfo = ref({});
const currentFormIndex = ref(0);
const allForms = ref(
  isArray(store.state.viewClientData.clientData.mutualFundFormData)
    ? store.state.viewClientData.clientData.mutualFundFormData
    : []
);
const toggleEditMode = () => {
  if (isEditing.value) {
    updateClientsData();
  }
  isEditing.value = !isEditing.value;
};
const updateClientsData = async () => {
  store.commit("setLoading", true);
  try {
    let clientId = store.state.viewClientData.id;
    let formParamsData = cloneDeep(allForms.value);
    let currentFormParamsData = cloneDeep(mutualFundFormData.value);
    if (isAddNewForm.value) {
      formParamsData.push({ ...currentFormParamsData });
    } else {
      formParamsData[currentFormIndex.value] = { ...currentFormParamsData };
    }
    const data = {
      mutualFundFormData: formParamsData,
      lastUpdated: Date(),
    };
    await queries.updateClientInformationData(clientId, data);
    store.commit("setLoading", false);
    isAddNewForm.value = false;
    isEditing.value = false;
    router.push({ name: "clients" });
  } catch (error) {
    console.error("Error updating client data:", error);
    store.commit("setLoading", false);
    router.push({ name: "clients" });

    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
    throw error;
  }
};

const setCurrentForm = (form, formIndex) => {
  currentFormInfo.value = form;
  currentFormIndex.value = formIndex;
  fetchMutualFundFormData();
};

const fetchMutualFundFormData = () => {
  // Simulated data for example
  mutualFundFormData.value = new MutualFundDetails(
    currentFormInfo.value.name ? currentFormInfo.value.name : "",
    currentFormInfo.value.startDate ? currentFormInfo.value.startDate : "",
    currentFormInfo.value.investmentType
      ? currentFormInfo.value.investmentType
      : "",
    currentFormInfo.value.companyName ? currentFormInfo.value.companyName : "",
    currentFormInfo.value.investmentAmount
      ? currentFormInfo.value.investmentAmount
      : "",
    currentFormInfo.value.remark ? currentFormInfo.value.remark : ""
  );
};

const initializeCurrentForm = () => {
  if (allForms.value.length) {
    currentFormInfo.value = allForms.value[0];
    fetchMutualFundFormData();
  } else {
    currentFormInfo.value = {};
    fetchMutualFundFormData();
  }
};

initializeCurrentForm();

const addNewForm = () => {
  if (!isAddNewForm.value) {
    currentFormInfo.value = {};
    fetchMutualFundFormData();
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
