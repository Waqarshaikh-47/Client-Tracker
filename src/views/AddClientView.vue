<template>
    <div>
      <!-- Progress Bar -->
      <div class="progress mb-4">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="progress-bar"
          :class="{ 'bg-success': index < currentStep, 'bg-info': index === currentStep }"
          :style="{ width: `${stepWidth}%` }"
          role="progressbar"
          :aria-valuenow="index + 1"
          :aria-valuemin="0"
          :aria-valuemax="steps.length"
          @click="setCurrentStep(index)"
        >
          Step {{ index + 1 }}
        </div>
      </div>
      <!-- Progress Bar -->
  
      <!-- Forms -->
      <form v-for="(step, index) in steps" :key="index" v-show="index === currentStep">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="formData[index].name" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="formData[index].email" type="email" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Message</label>
          <textarea v-model="formData[index].message" class="form-control" rows="3"></textarea>
        </div>
  
        <button @click.prevent="nextStep" type="button" class="btn btn-primary me-2" :disabled="!isFormValid(index)">
          Next
        </button>
        <button @click.prevent="prevStep" type="button" class="btn btn-secondary" :disabled="index === 0">
          Previous
        </button>
      </form>
      <!-- Forms -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const steps = ref([
    { name: 'Step 1', isValid: false },
    { name: 'Step 2', isValid: false },
    { name: 'Step 3', isValid: false }
  ]);
  
  const formData = ref([
    { name: '', email: '', message: '' },
    { name: '', email: '', message: '' },
    { name: '', email: '', message: '' }
  ]);
  
  const currentStep = ref(0);
  
  const stepWidth = 100 / steps.value.length;
  
  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++;
    }
  };
  
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };
  
  const setCurrentStep = (index) => {
    currentStep.value = index;
  };
  
  const isFormValid = (index) => {
    return Object.values(formData.value[index]).every((value) => value.trim() !== '');
  };
  </script>
  
  <style scoped>
  .progress-bar {
    cursor: pointer;
  }
  </style>
  