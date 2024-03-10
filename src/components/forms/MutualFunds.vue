<template>
  <div class="container mt-5">
    <h1>Mutual Funds</h1>
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
        <label for="investmentType" class="form-label">Investment Type</label>
        <select
          v-model="investmentType"
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
          v-model="companyName"
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
          v-model="investmentAmount"
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
const investmentType = ref("");
const companyName = ref("");
const investmentAmount = ref("");
const remark = ref("");

const submitForm = () => {
  // Here you can handle form submission, such as sending data to backend, etc.
  // For this example, let's just log the form data
  console.log({
    name: name.value,
    startDate: startDate.value,
    investmentType: investmentType.value,
    companyName: companyName.value,
    investmentAmount: investmentAmount.value,
    remark: remark.value,
  });

  // Reset form fields after submission
  name.value = "";
  startDate.value = "";
  investmentType.value = "";
  companyName.value = "";
  investmentAmount.value = "";
  remark.value = "";
};
</script>
