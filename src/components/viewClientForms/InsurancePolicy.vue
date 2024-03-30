<template>
  <div class="container mt-5">
    <h1>INSURANCE POLICY</h1>
    <div class="text-end" v-if="allForms.length">
      <button class="btn btn-primary" @click="addNewForm">
        {{ isAddNewForm ? "Save" : "Add New Form" }}
      </button>
    </div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ insurancePolicyFormData.name }}</p>
      <p><strong>Start Date:</strong> {{ insurancePolicyFormData.startDate }}</p>
      <p>
        <strong>Policy Number:</strong> {{ insurancePolicyFormData.policyNumber }}
      </p>
      <p><strong>Plan Type:</strong> {{ insurancePolicyFormData.planType }}</p>
      <p><strong>Company Name:</strong> {{ insurancePolicyFormData.companyName }}</p>
      <p><strong>Plan Name:</strong> {{ insurancePolicyFormData.planName }}</p>
      <p><strong>Payment Mode:</strong> {{ insurancePolicyFormData.paymentMode }}</p>
      <p>
        <strong>Premium Amount:</strong> {{ insurancePolicyFormData.premiumAmount }}
      </p>
      <p><strong>Sum Assured:</strong> {{ insurancePolicyFormData.sumAssured }}</p>
      <p>
        <strong>Premium Payment Term:</strong>
        {{ insurancePolicyFormData.premiumPayTerm }}
      </p>
      <p><strong>Policy Term:</strong> {{ insurancePolicyFormData.policyTerm }}</p>
      <p>
        <strong>Maturity Date:</strong> {{ insurancePolicyFormData.maturityDate }}
      </p>
      <p><strong>Remark:</strong> {{ insurancePolicyFormData.remark }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="insurancePolicyFormData.name"
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
          v-model="insurancePolicyFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="policyNumber" class="form-label">Policy Number</label>
        <input
          v-model="insurancePolicyFormData.policyNumber"
          type="text"
          class="form-control"
          id="policyNumber"
          placeholder="Enter policy number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="planType" class="form-label">Plan Type</label>
        <select
          v-model="insurancePolicyFormData.planType"
          class="form-select"
          id="planType"
          required
        >
          <option value="Traditional Plan">Traditional Plan</option>
          <option value="ULIP">ULIP</option>
          <option value="Term Plan">Term Plan</option>
          <option value="Pension Plan">Pension Plan</option>
          <option value="" selected>Other</option>
        </select>
        <div
          v-if="
            insurancePolicyFormData.planType !== 'Traditional Plan' &&
            insurancePolicyFormData.planType !== 'ULIP' &&
            insurancePolicyFormData.planType !== 'Term Plan' &&
            insurancePolicyFormData.planType !== 'Pension Plan'
          "
        >
          <input
            v-model="insurancePolicyFormData.planType"
            type="text"
            class="form-control"
            id="planType"
            placeholder="Other"
            required
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="companyName" class="form-label">Company Name</label>
        <input
          v-model="insurancePolicyFormData.companyName"
          type="text"
          class="form-control"
          id="companyName"
          placeholder="Enter company name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="planName" class="form-label">Plan Name</label>
        <input
          v-model="insurancePolicyFormData.planName"
          type="text"
          class="form-control"
          id="planName"
          placeholder="Enter plan name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="paymentMode" class="form-label">Payment Mode</label>
        <select
          v-model="insurancePolicyFormData.paymentMode"
          class="form-select"
          id="paymentMode"
          required
        >
          <option value="" disabled selected>Select payment mode</option>
          <option value="Yearly">Yearly</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="premiumAmount" class="form-label">Premium Amount</label>
        <input
          v-model="insurancePolicyFormData.premiumAmount"
          type="number"
          class="form-control"
          id="premiumAmount"
          placeholder="Enter premium amount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="sumAssured" class="form-label">Sum Assured</label>
        <input
          v-model="insurancePolicyFormData.sumAssured"
          type="number"
          class="form-control"
          id="sumAssured"
          placeholder="Enter sum assured"
          required
        />
      </div>
      <div class="mb-3">
        <label for="premiumPayTerm" class="form-label"
          >Premium Payment Term</label
        >
        <input
          v-model="insurancePolicyFormData.premiumPayTerm"
          type="number"
          class="form-control"
          id="premiumPayTerm"
          placeholder="Enter premium payment term"
          required
        />
      </div>
      <div class="mb-3">
        <label for="policyTerm" class="form-label">Policy Term</label>
        <input
          v-model="insurancePolicyFormData.policyTerm"
          type="number"
          class="form-control"
          id="policyTerm"
          placeholder="Enter policy term"
          required
        />
      </div>
      <div class="mb-3">
        <label for="maturityDate" class="form-label">Maturity Date</label>
        <input
          v-model="insurancePolicyFormData.maturityDate"
          type="date"
          class="form-control"
          id="maturityDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="remark" class="form-label">Remark</label>
        <textarea
          v-model="insurancePolicyFormData.remark"
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
import { useStore } from "vuex";
import { InsurancePolicyDetails } from "@/schemas/forms/InsurancePolicyDetails";
import queries from "@/plugins/db/queries/quries";
import { cloneDeep, isArray } from "lodash";
import router from "@/router";


const store = useStore();

const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const insurancePolicyFormData = ref(new InsurancePolicyDetails());
const isEditing = ref(false);
const isAddNewForm = ref(false);
const currentFormInfo = ref({});
const currentFormIndex = ref(0);
const allForms = ref(
  isArray(store.state.viewClientData.clientData.insurancePolicyFormData)
    ? store.state.viewClientData.clientData.insurancePolicyFormData
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
    let currentFormParamsData = cloneDeep(insurancePolicyFormData.value);
    if (isAddNewForm.value) {
      formParamsData.push({ ...currentFormParamsData });
    } else {
      formParamsData[currentFormIndex.value] = { ...currentFormParamsData };
    }
    const data = {
      insurancePolicyFormData: formParamsData,
      lastUpdated: Date(),
    }
    await queries.updateClientInformationData(clientId,data);
    store.commit('setLoading',false)
    isAddNewForm.value = false;
    isEditing.value = false;
    router.push({ name: "clients" });
  } catch (error) {
    console.error("Error updating client data:", error);
    store.commit('setLoading',false)

    // You can handle the error here, like showing a toast message
    // For now, let's re-throw the error to propagate it
    throw error;
  }
}

const fetchInsuranceFormData = () => {
  // Simulated data for example
  insurancePolicyFormData.value = new InsurancePolicyDetails(
    currentFormInfo.value.name ? currentFormInfo.value.name : '',
    currentFormInfo.value.startDate ? currentFormInfo.value.startDate : '',
    currentFormInfo.value.policyNumber ? currentFormInfo.value.policyNumber : '',
    currentFormInfo.value.planType ? currentFormInfo.value.planType : '',
    currentFormInfo.value.companyName ? currentFormInfo.value.companyName : '',
    currentFormInfo.value.planName ? currentFormInfo.value.planName : '',
    currentFormInfo.value.paymentMode ? currentFormInfo.value.paymentMode : '',
    currentFormInfo.value.premiumAmount ? currentFormInfo.value.premiumAmount : '',
    currentFormInfo.value.sumAssured ? currentFormInfo.value.sumAssured : '',
    currentFormInfo.value.premiumPayTerm ? currentFormInfo.value.premiumPayTerm : '',
    currentFormInfo.value.policyTerm ? currentFormInfo.value.policyTerm : '',
    currentFormInfo.value.maturityDate ? currentFormInfo.value.maturityDate : '',
    currentFormInfo.value.remark ? currentFormInfo.value.remark : ''
  );
};

const setCurrentForm = (form, formIndex) => {
  currentFormInfo.value = form;
  currentFormIndex.value = formIndex;
  fetchInsuranceFormData();
};

const initializeCurrentForm = () => {
  if (allForms.value.length) {
    currentFormInfo.value = allForms.value[0];
    fetchInsuranceFormData();
  } else {
    currentFormInfo.value = {};
    fetchInsuranceFormData();
  }
};

initializeCurrentForm();

const addNewForm = () => {
  if (!isAddNewForm.value) {
    currentFormInfo.value = {};
    fetchInsuranceFormData();
    isEditing.value = true;
    isAddNewForm.value = true;
  } else {
    updateClientsData();
  }
};</script>

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
