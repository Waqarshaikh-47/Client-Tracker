<template>
  <div class="container mt-5">
    <h1>Fixed Deposit Details</h1>
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
        <label for="investmentAmount" class="form-label"
          >Investment Amount</label
        >
        <input
          v-model="investmentAmount"
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
          v-model="annualInterestRate"
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
          v-model="startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="tenure" class="form-label"
          >Tenure (in months or years)</label
        >
        <input
          v-model="tenure"
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
const name = ref("");
const investmentAmount = ref("");
const annualInterestRate = ref("");
const startDate = ref("");
const tenure = ref("");

const submitForm = () => {
  // Here you can handle form submission, such as sending data to backend, etc.
  // For this example, let's just log the form data
  console.log({
    name: name.value,
    investmentAmount: investmentAmount.value,
    annualInterestRate: annualInterestRate.value,
    startDate: startDate.value,
    tenure: tenure.value,
  });

  // Reset form fields after submission
  name.value = "";
  investmentAmount.value = "";
  annualInterestRate.value = "";
  startDate.value = "";
  tenure.value = "";
};
</script>
