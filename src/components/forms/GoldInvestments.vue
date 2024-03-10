<template>
  <div class="container mt-5">
    <h1>Gold Investment Details</h1>
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
        <label for="investmentValue" class="form-label"
          >Investment Value per Gram (in Rs)</label
        >
        <input
          v-model="investmentValue"
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
          v-model="quantity"
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
          v-model="investmentDate"
          type="date"
          class="form-control"
          id="investmentDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="goldType" class="form-label">Select Gold Type</label>
        <select v-model="goldType" class="form-select" id="goldType">
          <option value="" selected>Not Specified</option>
          <option value="22 Carat">22 Carat</option>
          <option value="24 Carat">24 Carat</option>
        </select>
       <div v-if="goldType != '22 Carat' && goldType != '24 Carat' " >
        <input v-model="goldType" type="text" class="form-control" id="goldType" placeholder="Enter gold type" required>
       </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup language="ts">
import { ref } from "vue";

const name = ref("");
const investmentValue = ref("");
const quantity = ref("");
const investmentDate = ref("");
const goldType = ref("");

const submitForm = () => {
  // Here you can handle form submission, such as sending data to backend, etc.
  // For this example, let's just log the form data
  console.log({
    name: name.value,
    investmentValue: investmentValue.value,
    quantity: quantity.value,
    investmentDate: investmentDate.value,
    goldType: goldType.value,
  });

  // Reset form fields after submission
  name.value = "";
  investmentValue.value = "";
  quantity.value = "";
  investmentDate.value = "";
  goldType.value = "";
};
</script>
