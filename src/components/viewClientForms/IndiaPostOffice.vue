<template>
  <div class="container mt-5">
    <h1>INDIA POST OFFICE</h1>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <p><strong>Name:</strong> {{ indiaPostFormData.name }}</p>
      <p>
        <strong>Annual Rate of Interest (%):</strong>
        {{ indiaPostFormData.annualInterestRate }}
      </p>
      <p><strong>Start Date:</strong> {{ indiaPostFormData.startDate }}</p>
      <p>
        <strong>Tenure End Date:</strong> {{ indiaPostFormData.tenureEndDate }}
      </p>
      <p>
        <strong>Interest Compounding Frequency:</strong>
        {{ indiaPostFormData.compoundingFrequency }}
      </p>
    </div>

    <!-- Edit Mode -->
    <form v-else @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="indiaPostFormData.name"
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
          v-model="indiaPostFormData.annualInterestRate"
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
          v-model="indiaPostFormData.startDate"
          type="date"
          class="form-control"
          id="startDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="tenureEndDate" class="form-label">Tenure End Date</label>
        <input
          v-model="indiaPostFormData.tenureEndDate"
          type="date"
          class="form-control"
          id="tenureEndDate"
          required
          style="max-width: 200px"
        />
      </div>
      <div class="mb-3">
        <label for="compoundingFrequency" class="form-label"
          >Interest Compounding Frequency</label
        >
        <select
          v-model="indiaPostFormData.compoundingFrequency"
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
import { IndiaPostOfficeDetails } from "@/schemas/forms/IndiaPostOfficeDetails";

const store = useStore();
const props = defineProps({
  legIndex: Number,
  isLastForm: Boolean,
});
const emit = defineEmits(["next-step", "prev-step"]);
const indiaPostFormData = ref(new IndiaPostOfficeDetails());
const isEditing = ref(false);
const currentFormInfo = store.state.viewClientData.clientData.indiaPostFormData;

const submitForm = () => {
  store.commit("setIndiaPostFormData", indiaPostFormData.value);
  emit("next-step");
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // Reset form data if cancelling edit mode
    // indiaPostFormData.value = new IndiaPostOfficeDetails();
  }
};

const previousButton = () => {
  emit("prev-step");
};

// Fetch initial India Post Office data or set from store
const fetchIndiaPostData = () => {
  // Simulated data for example
  indiaPostFormData.value = new IndiaPostOfficeDetails(
    currentFormInfo.name,
    currentFormInfo.annualInterestRate,
    currentFormInfo.startDate,
    currentFormInfo.tenureEndDate,
    currentFormInfo.compoundingFrequency
  );
};

fetchIndiaPostData();
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
