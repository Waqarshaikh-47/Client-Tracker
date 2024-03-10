<template>
  <div class="container mt-5">
    <h1>INSURANCE POLICY</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="name"
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
          v-model="startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="policyNumber" class="form-label">Policy Number</label>
        <input
          v-model="policyNumber"
          type="text"
          class="form-control"
          id="policyNumber"
          placeholder="Enter policy number"
          required
        />
      </div>
      <div class="mb-3">
        <label for="planType" class="form-label">Plan Type</label>
        <select v-model="planType" class="form-select" id="planType" required>
          <option value="Traditional Plan">Traditional Plan</option>
          <option value="ULIP">ULIP</option>
          <option value="Term Plan">Term Plan</option>
          <option value="Pension Plan">Pension Plan</option>
          <option value="" selected>Other</option>
        </select>
        <div
          v-if="
            planType != 'Traditional Plan' &&
            planType != 'ULIP' &&
            planType != 'Term Plan' &&
            planType != 'Pension Plan'
          "
        >
          <input
            v-model="planType"
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
          v-model="companyName"
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
          v-model="planName"
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
          v-model="paymentMode"
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
          v-model="premiumAmount"
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
          v-model="sumAssured"
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
          v-model="premiumPayTerm"
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
          v-model="policyTerm"
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
          v-model="maturityDate"
          type="date"
          class="form-control"
          id="maturityDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="remark" class="form-label">Remark</label>
        <textarea
          v-model="remark"
          class="form-control"
          id="remark"
          rows="3"
          placeholder="Enter any remarks"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
const name = ref("");
const startDate = ref("");
const policyNumber = ref("");
const planType = ref("");
const companyName = ref("");
const planName = ref("");
const paymentMode = ref("");
const premiumAmount = ref("");
const sumAssured = ref("");
const premiumPayTerm = ref("");
const policyTerm = ref("");
const maturityDate = ref("");
const remark = ref("");

const submitForm = () => {
  // Here you can handle form submission, such as sending data to backend, etc.
  // For this example, let's just log the form data
  console.log({
    name: name.value,
    startDate: startDate.value,
    policyNumber: policyNumber.value,
    planType: planType.value,
    companyName: companyName.value,
    planName: planName.value,
    paymentMode: paymentMode.value,
    premiumAmount: premiumAmount.value,
    sumAssured: sumAssured.value,
    premiumPayTerm: premiumPayTerm.value,
    policyTerm: policyTerm.value,
    maturityDate: maturityDate.value,
    remark: remark.value,
  });

  // Reset form fields after submission
  name.value = "";
  startDate.value = "";
  policyNumber.value = "";
  planType.value = "";
  companyName.value = "";
  planName.value = "";
  paymentMode.value = "";
  premiumAmount.value = "";
  sumAssured.value = "";
  premiumPayTerm.value = "";
  policyTerm.value = "";
  maturityDate.value = "";
  remark.value = "";
};
</script>
