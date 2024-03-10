<template>
  <div class="container mt-5">
    <h1>INDIA POST OFFICE</h1>
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
        <label for="tenure" class="form-label">Tenure End Date</label>
        <input
          v-model="tenureEndDate"
          type="date"
          class="form-control"
          id="tenureEndDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="compoundingFrequency" class="form-label"
          >Interest Compounding Frequency</label
        >
        <select
          v-model="compoundingFrequency"
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";
const name = ref("");
const annualInterestRate = ref("");
const startDate = ref("");
const tenureEndDate = ref("");
const compoundingFrequency = ref("");

const submitForm = () => {
  // Here you can handle form submission, such as calculating interest, etc.
  // For this example, let's just log the form data
  console.log({
    name: name.value,
    annualInterestRate: annualInterestRate.value,
    startDate: startDate.value,
    tenureEndDate: tenureEndDate.value,
    compoundingFrequency: compoundingFrequency.value,
  });

  // Reset form fields after submission
  name.value = "";
  annualInterestRate.value = "";
  startDate.value = "";
  tenureEndDate.value = "";
  compoundingFrequency.value = "";
};
</script>
