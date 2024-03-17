<template>
  <div class="container mt-5">
    <h1>INSURANCE POLICY</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="insuranceFormData.name" type="text" class="form-control" id="name" placeholder="Enter your name"
          required />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Start Date</label>
        <input v-model="insuranceFormData.startDate" type="date" class="form-control" id="startDate" required style="max-width: 200px;" />
      </div>
      <div class="mb-3">
        <label for="policyNumber" class="form-label">Policy Number</label>
        <input v-model="insuranceFormData.policyNumber" type="text" class="form-control" id="policyNumber"
          placeholder="Enter policy number" required />
      </div>
      <div class="mb-3">
        <label for="planType" class="form-label">Plan Type</label>
        <select v-model="insuranceFormData.planType" class="form-select" id="planType" required>
          <option value="Traditional Plan">Traditional Plan</option>
          <option value="ULIP">ULIP</option>
          <option value="Term Plan">Term Plan</option>
          <option value="Pension Plan">Pension Plan</option>
          <option value="" selected>Other</option>
        </select>
        <div v-if="insuranceFormData.planType !== 'Traditional Plan' &&
          insuranceFormData.planType !== 'ULIP' &&
          insuranceFormData.planType !== 'Term Plan' &&
          insuranceFormData.planType !== 'Pension Plan'
        ">
          <input v-model="insuranceFormData.planType" type="text" class="form-control" id="planType" placeholder="Other"
            required />
        </div>
      </div>
      <div class="mb-3">
        <label for="companyName" class="form-label">Company Name</label>
        <input v-model="insuranceFormData.companyName" type="text" class="form-control" id="companyName"
          placeholder="Enter company name" required />
      </div>
      <div class="mb-3">
        <label for="planName" class="form-label">Plan Name</label>
        <input v-model="insuranceFormData.planName" type="text" class="form-control" id="planName"
          placeholder="Enter plan name" required />
      </div>
      <div class="mb-3">
        <label for="paymentMode" class="form-label">Payment Mode</label>
        <select v-model="insuranceFormData.paymentMode" class="form-select" id="paymentMode" required>
          <option value="" disabled selected>Select payment mode</option>
          <option value="Yearly">Yearly</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="premiumAmount" class="form-label">Premium Amount</label>
        <input v-model="insuranceFormData.premiumAmount" type="number" class="form-control" id="premiumAmount"
          placeholder="Enter premium amount" required />
      </div>
      <div class="mb-3">
        <label for="sumAssured" class="form-label">Sum Assured</label>
        <input v-model="insuranceFormData.sumAssured" type="number" class="form-control" id="sumAssured"
          placeholder="Enter sum assured" required />
      </div>
      <div class="mb-3">
        <label for="premiumPayTerm" class="form-label">Premium Payment Term</label>
        <input v-model="insuranceFormData.premiumPayTerm" type="number" class="form-control" id="premiumPayTerm"
          placeholder="Enter premium payment term" required />
      </div>
      <div class="mb-3">
        <label for="policyTerm" class="form-label">Policy Term</label>
        <input v-model="insuranceFormData.policyTerm" type="number" class="form-control" id="policyTerm"
          placeholder="Enter policy term" required />
      </div>
      <div class="mb-3">
        <label for="maturityDate" class="form-label">Maturity Date</label>
        <input v-model="insuranceFormData.maturityDate" type="date" class="form-control" id="maturityDate" required style="max-width: 200px;" />
      </div>
      <div class="mb-3">
        <label for="remark" class="form-label">Remark</label>
        <textarea v-model="insuranceFormData.remark" class="form-control" id="remark" rows="3"
          placeholder="Enter any remarks"></textarea>
      </div>
      <div class="d-flex justify-content-between mt-4 mb-4">
        <button :disabled="legIndex == 0" @click.prevent="previousButton" type="button" class="btn btn-secondary">
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
import { InsurancePolicyDetails } from "@/schemas/forms/InsurancePolicyDetails";
import queries from '@/plugins/db/queries/quries';

const store = useStore()

const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const insuranceFormData = new InsurancePolicyDetails();

const updateClientsData = async() => {
  let clientId = store.state.clientId;
  const data = {
    insurancePolicyFormData: { ...insuranceFormData },
    lastUpdated: Date(),
    fillerInfo: {
      name: store.state.user.displayName,
      email: store.state.user.email,
    }
  }
  console.log("update",data);
  await queries.updateClientInformationData(clientId,data);
}

const submitForm = () => {
  store.commit('setLoading', true);
  store.commit("setInsurancePolicyFormData", insuranceFormData);
  store.commit('setLoading', false);
  updateClientsData();
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
