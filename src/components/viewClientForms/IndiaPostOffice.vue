<template>
  <div class="container mt-5">
    <h1>INDIA POST OFFICE</h1>
    <div class="text-end" v-if="allForms.length">
      <button class="btn btn-primary" v-if="!isAddNewForm" @click="addNewForm">
        Add New Form
      </button>
    </div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ indiaPostFormData.name }}</p>
      <p>
        <strong>Annual Rate of Interest (%):</strong>
        {{ indiaPostFormData.annualInterestRate }}
      </p>
      <p><strong>Start Date:</strong> {{ indiaPostFormData.startDate }}</p>
      <p>
        <strong>Tenure End Date:</strong> {{ indiaPostFormData.tenureEndDate }}
      </p>
      <p>
        <strong>Interest Compounding Frequency:</strong>
        {{ indiaPostFormData.compoundingFrequency }}
      </p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="toggleEditMode">
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
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="tenureEndDate" class="form-label">Tenure End Date</label>
        <input
          v-model="indiaPostFormData.tenureEndDate"
          type="date"
          class="form-control"
          id="tenureEndDate"
          required
          style="max-width: 200px"
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
      <button type="submit" class="btn btn-primary">
        Save
      </button>
    </div>
    </form>
    <div class="d-flex justify-content-between mt-4 mb-4" v-if="!isEditing">
      <button @click="toggleEditMode" class="btn btn-primary">
        Edit
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
        <i class="bi bi-journal"></i> {{ form.name }}
      </li>
    </ul>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { IndiaPostOfficeDetails } from "@/schemas/forms/IndiaPostOfficeDetails";
import queries from '@/plugins/db/queries/quries';
import { cloneDeep, isArray } from "lodash";
import router from "@/router";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const indiaPostFormData = ref(new IndiaPostOfficeDetails());
const isEditing = ref(false);
const isAddNewForm = ref(false);
const currentFormInfo = ref({});
const currentFormIndex = ref(0);
const allForms = ref(
  isArray(store.state.viewClientData.clientData.indiaPostFormData)
    ? store.state.viewClientData.clientData.indiaPostFormData
    : []
);

const toggleEditMode = () => {
  if (isEditing.value) {
    updateClientsData()
  }
  isEditing.value = !isEditing.value;
};
const updateClientsData = async() => {
  store.commit('setLoading',true)
  try {
    let clientId = store.state.viewClientData.id;
    let formParamsData = cloneDeep(allForms.value);
    let currentFormParamsData = cloneDeep(indiaPostFormData.value);
    if (isAddNewForm.value) {
      formParamsData.push({ ...currentFormParamsData });
    } else {
      formParamsData[currentFormIndex.value] = { ...currentFormParamsData };
    }
    const data = {
      indiaPostFormData: formParamsData,
      lastUpdated: Date(),
    }
    await queries.updateClientInformationData(clientId,data);
    isAddNewForm.value = false;
    isEditing.value = false;
    store.commit('setLoading',false)
    router.push({ name: "clients" });
  } catch (error) {
    console.error("Error updating client data:", error);
    store.commit('setLoading',false)
    throw error;
  }
}

const fetchIndiaPostData = () => {
  indiaPostFormData.value = new IndiaPostOfficeDetails(
    currentFormInfo.value.name ? currentFormInfo.value.name : '' ,
    currentFormInfo.value.annualInterestRate ? currentFormInfo.value.annualInterestRate : '' ,
    currentFormInfo.value.startDate ? currentFormInfo.value.startDate : '' ,
    currentFormInfo.value.tenureEndDate ? currentFormInfo.value.tenureEndDate : '' ,
    currentFormInfo.value.compoundingFrequency ? currentFormInfo.value.compoundingFrequency : '' 
  );
};

const setCurrentForm = (form, formIndex) => {
  currentFormInfo.value = form;
  currentFormIndex.value = formIndex;
  fetchIndiaPostData();
};
const initializeCurrentForm = () => {
  if (allForms.value.length) {
    currentFormInfo.value = allForms.value[0];
    fetchIndiaPostData();
  } else {
    currentFormInfo.value = {};
    fetchIndiaPostData();
  }
};

initializeCurrentForm();

const addNewForm = () => {
  if (!isAddNewForm.value) {
    currentFormInfo.value = {};
    fetchIndiaPostData();
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
