<template>
  <div class="container mt-5">
    <h1>INSURANCE POLICY</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ insuranceFormData.name }}</p>
      <p><strong>Start Date:</strong> {{ insuranceFormData.startDate }}</p>
      <p>
        <strong>Policy Number:</strong> {{ insuranceFormData.policyNumber }}
      </p>
      <p><strong>Plan Type:</strong> {{ insuranceFormData.planType }}</p>
      <p><strong>Company Name:</strong> {{ insuranceFormData.companyName }}</p>
      <p><strong>Plan Name:</strong> {{ insuranceFormData.planName }}</p>
      <p><strong>Payment Mode:</strong> {{ insuranceFormData.paymentMode }}</p>
      <p>
        <strong>Premium Amount:</strong> {{ insuranceFormData.premiumAmount }}
      </p>
      <p><strong>Sum Assured:</strong> {{ insuranceFormData.sumAssured }}</p>
      <p>
        <strong>Premium Payment Term:</strong>
        {{ insuranceFormData.premiumPayTerm }}
      </p>
      <p><strong>Policy Term:</strong> {{ insuranceFormData.policyTerm }}</p>
      <p>
        <strong>Maturity Date:</strong> {{ insuranceFormData.maturityDate }}
      </p>
      <p><strong>Remark:</strong> {{ insuranceFormData.remark }}</p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="insuranceFormData.name"
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
          v-model="insuranceFormData.startDate"
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
          v-model="insuranceFormData.policyNumber"
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
          v-model="insuranceFormData.planType"
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
            insuranceFormData.planType !== 'Traditional Plan' &&
            insuranceFormData.planType !== 'ULIP' &&
            insuranceFormData.planType !== 'Term Plan' &&
            insuranceFormData.planType !== 'Pension Plan'
          "
        >
          <input
            v-model="insuranceFormData.planType"
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
          v-model="insuranceFormData.companyName"
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
          v-model="insuranceFormData.planName"
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
          v-model="insuranceFormData.paymentMode"
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
          v-model="insuranceFormData.premiumAmount"
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
          v-model="insuranceFormData.sumAssured"
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
          v-model="insuranceFormData.premiumPayTerm"
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
          v-model="insuranceFormData.policyTerm"
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
          v-model="insuranceFormData.maturityDate"
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
          v-model="insuranceFormData.remark"
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
const insuranceFormData = ref(new InsurancePolicyDetails());
const isEditing = ref(false);

const saveClientsData = () => {
  const data = {
    clientInformationFormData: { ...store.state.clientInformationFormData },
    fixedDepositFormData: { ...store.state.fixedDepositFormData },
    goldInvestmentFormData: { ...store.state.goldInvestmentFormData },
    indiaPostFormData: { ...store.state.indiaPostFormData },
    insurancePolicyFormData: { ...insuranceFormData.value },
    mutualFundFormData: { ...store.state.mutualFundFormData },
    timestamp: Date.now(),
    fillerInfo: {
      name: store.state.user.displayName,
      email: store.state.user.email,
    },
  };

  queries.addClientInformationData(data);
};

const submitForm = () => {
  store.commit("setInsurancePolicyFormData", insuranceFormData.value);

  saveClientsData();
  // emit("next-step");
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};

const previousButton = () => {
  emit("prev-step");
};

const fetchInsuranceFormData = () => {
  // Simulated data for example
  insuranceFormData.value = new InsurancePolicyDetails(
    currentFormInfo.name,
    currentFormInfo.startDate,
    currentFormInfo.policyNumber,
    currentFormInfo.planType,
    currentFormInfo.companyName,
    currentFormInfo.planName,
    currentFormInfo.paymentMode,
    currentFormInfo.premiumAmount,
    currentFormInfo.sumAssured,
    currentFormInfo.premiumPayTerm,
    currentFormInfo.policyTerm,
    currentFormInfo.maturityDate,
    currentFormInfo.remark
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
