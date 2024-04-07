<template>
  <div class="container mt-5">
    <h1>Gold Investment Details</h1>
    <div class="text-end" v-if="allForms.length">
      <button class="btn btn-primary" v-if="!isAddNewForm" @click="addNewForm">
        Add New Form
      </button>
    </div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ goldInvestmentFormData.name }}</p>
      <p>
        <strong>Investment Value per Gram (in Rs):</strong>
        {{ goldInvestmentFormData.investmentValue }}
      </p>
      <p>
        <strong>Quantity of Grams:</strong>
        {{ goldInvestmentFormData.quantity }}
      </p>
      <p>
        <strong>Date of Investment:</strong>
        {{ goldInvestmentFormData.investmentDate }}
      </p>
      <p><strong>Gold Type:</strong> {{ goldInvestmentFormData.goldType }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="toggleEditMode" >
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="goldInvestmentFormData.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentValue" class="form-label"
          >Investment Value per Gram (in Rs)</label
        >
        <input
          v-model="goldInvestmentFormData.investmentValue"
          type="number"
          class="form-control"
          id="investmentValue"
          placeholder="Enter investment value per gram"
          required
        />
      </div>
      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity of Grams</label>
        <input
          v-model="goldInvestmentFormData.quantity"
          type="number"
          class="form-control"
          id="quantity"
          placeholder="Enter quantity of grams"
          required
        />
      </div>
      <div class="mb-3">
        <label for="investmentDate" class="form-label"
          >Date of Investment</label
        >
        <input
          v-model="goldInvestmentFormData.investmentDate"
          type="date"
          class="form-control"
          id="investmentDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="goldType" class="form-label">Select Gold Type</label>
        <select
          v-model="goldInvestmentFormData.goldType"
          class="form-select"
          id="goldType"
        >
          <option value="" selected>Not Specified</option>
          <option value="22 Carat">22 Carat</option>
          <option value="24 Carat">24 Carat</option>
        </select>
        <div
          v-if="
            goldInvestmentFormData.goldType !== '22 Carat' &&
            goldInvestmentFormData.goldType !== '24 Carat'
          "
        >
          <input
            v-model="goldInvestmentFormData.goldType"
            type="text"
            class="form-control"
            id="goldType"
            placeholder="Enter gold type"
            required
          />
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4" >
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
import { GoldInvestmentDetails } from "@/schemas/forms/GoldInvestmentDetails";
import queries from '@/plugins/db/queries/quries';
import router from "@/router";
import { cloneDeep, isArray } from "lodash";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const goldInvestmentFormData = ref(new GoldInvestmentDetails());
const isEditing = ref(false);
const isAddNewForm = ref(false);
const currentFormInfo = ref({});
const currentFormIndex = ref(0);
const allForms = ref(
  isArray(store.state.viewClientData.clientData.goldInvestmentFormData)
    ? store.state.viewClientData.clientData.goldInvestmentFormData
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
    let currentFormParamsData = cloneDeep(goldInvestmentFormData.value);
    if (isAddNewForm.value) {
      formParamsData.push({ ...currentFormParamsData });
    } else {
      formParamsData[currentFormIndex.value] = { ...currentFormParamsData };
    }
    const data = {
      goldInvestmentFormData: formParamsData,
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



const fetchGoldInvestmentData = () => {
  goldInvestmentFormData.value = new GoldInvestmentDetails(
    currentFormInfo.value.name ? currentFormInfo.value.name : '',
    currentFormInfo.value.investmentValue ? currentFormInfo.value.investmentValue : '',
    currentFormInfo.value.quantity ? currentFormInfo.value.quantity : '',
    currentFormInfo.value.investmentDate ? currentFormInfo.value.investmentDate : '',
    currentFormInfo.value.goldType ? currentFormInfo.value.goldType : ''
  );
};

const setCurrentForm = (form, formIndex) => {
  currentFormInfo.value = form;
  currentFormIndex.value = formIndex;
  fetchGoldInvestmentData();
};

const initializeCurrentForm = () => {
  if (allForms.value.length) {
    currentFormInfo.value = allForms.value[0];
    fetchGoldInvestmentData();
  } else {
    currentFormInfo.value = {};
    fetchGoldInvestmentData();
  }
};
initializeCurrentForm();

const addNewForm = () => {
  if (!isAddNewForm.value) {
    currentFormInfo.value = {};
    fetchGoldInvestmentData();
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
