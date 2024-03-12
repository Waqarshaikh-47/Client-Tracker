<template>
  <div class="container mt-5">
    <!-- Progress Tabs -->
    <div class="progress-tabs mb-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="progress-tab"
        :class="{
          'active': index === currentStep,
          'completed': index < currentStep,
        }"
        @click="setCurrentStep(index)"
      >
        <div class="progress-tab-content">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-name">{{ step.name }}</span>
        </div>
      </div>
    </div>
    <!-- Progress Tabs -->

    <!-- Forms -->
    <template v-for="(step, index) in steps" :key="index">
      <div v-show="index === currentStep">
        <component :is="step.componentName" @prev-step="prevStep" @next-step="nextStep" />
        <div class="d-flex justify-content-between mt-4">
          <button
            @click.prevent="prevStep"
            type="button"
            class="btn btn-secondary"
            :disabled="index === 0"
          >
            Previous
          </button>
          <button
            @click.prevent="nextStep"
            type="button"
            class="btn btn-primary"
            :disabled="!step.isValid && index !== 0"
          >
            {{ steps.length - 1 == index ? "Save & Continue" : "Next" }}
          </button>
        </div>
      </div>
    </template>
    <!-- Forms -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ClientInformation from "@/components/forms/ClientInformation.vue";
import MutualFunds from "@/components/forms/MutualFunds.vue";
import GoldInvestments from "@/components/forms/GoldInvestments.vue";
import FixedDeposit from "@/components/forms/FixedDeposit.vue";
import IndiaPostOffice from "@/components/forms/IndiaPostOffice.vue";
import InsurancePolicy from "@/components/forms/InsurancePolicy.vue";

const steps = ref([
  {
    name: "Client Information",
    isValid: false,
    componentName: ClientInformation,
  },
  { name: "Mutual Fund", isValid: false, componentName: MutualFunds },
  { name: "Gold Investment", isValid: false, componentName: GoldInvestments },
  { name: "Fixed Deposit Info", isValid: false, componentName: FixedDeposit },
  { name: "India Post Office", isValid: false, componentName: IndiaPostOffice },
  { name: "Insurance Policy", isValid: false, componentName: InsurancePolicy },
]);

const formData = ref([
  { name: "", email: "", message: "" },
  { name: "", email: "", message: "" },
  { name: "", email: "", message: "" },
]);

const currentStep = ref(0);

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
  return Object.values(formData.value[index]).every(
    (value) => value.trim() !== ""
  );
};
</script>

<style scoped>
.progress-tabs {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  background-color: #343a40;
  border-radius: 8px;
  padding: 8px;
}

.progress-tab {
  cursor: pointer;
  color: #fff;
  flex: 1;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
}

.progress-tab.active {
  background-color: #000103;
}

.progress-tab.completed {
  background-color: #343a40;
}

.step-number {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
}

.step-name {
  display: block;
  font-size: 0.9rem;
}

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

.btn-group-lg > .btn,
.btn-lg {
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
}
</style>
