<template>
  <div class="container mt-5">
    <h1>INSURANCE POLICY</h1>

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
import { InsurancePolicyDetails } from "@/schemas/forms/InsurancePolicyDetails";
import queries from "@/plugins/db/queries/quries";

const store = useStore();
const currentFormInfo = store.state.viewClientData.clientData.insurancePolicyFormData;

const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const insurancePolicyFormData = ref(new InsurancePolicyDetails());
const isEditing = ref(false);

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
    const data = {
      insurancePolicyFormData: { ...insurancePolicyFormData.value },
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

const fetchInsuranceFormData = () => {
  // Simulated data for example
  insurancePolicyFormData.value = new InsurancePolicyDetails(
    currentFormInfo.name ? currentFormInfo.name : '',
    currentFormInfo.startDate ? currentFormInfo.startDate : '',
    currentFormInfo.policyNumber ? currentFormInfo.policyNumber : '',
    currentFormInfo.planType ? currentFormInfo.planType : '',
    currentFormInfo.companyName ? currentFormInfo.companyName : '',
    currentFormInfo.planName ? currentFormInfo.planName : '',
    currentFormInfo.paymentMode ? currentFormInfo.paymentMode : '',
    currentFormInfo.premiumAmount ? currentFormInfo.premiumAmount : '',
    currentFormInfo.sumAssured ? currentFormInfo.sumAssured : '',
    currentFormInfo.premiumPayTerm ? currentFormInfo.premiumPayTerm : '',
    currentFormInfo.policyTerm ? currentFormInfo.policyTerm : '',
    currentFormInfo.maturityDate ? currentFormInfo.maturityDate : '',
    currentFormInfo.remark ? currentFormInfo.remark : ''
  );
};

fetchInsuranceFormData();
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
