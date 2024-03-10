<template>
  <div>
    <!-- Progress Bar -->
    <div class="progress mb-4 mt-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="progress-bar"
        :class="{
          'bg-success': index < currentStep,
          'bg-secondary': index === currentStep,
        }"
        :style="{ width: `${stepWidth}%` }"
        role="progressbar"
        :aria-valuenow="index + 1"
        :aria-valuemin="0"
        :aria-valuemax="steps.length"
        @click="setCurrentStep(index)"
      >
        {{ step.name }}
      </div>
    </div>
    <!-- Progress Bar -->

    <!-- Forms --><template v-for="(step, index) in steps" :key="index">
      <div v-show="index === currentStep">
        <component :is="step.componentName" />
        <div class="d-flex">
          <div class="p-2">
            <button
              @click.prevent="prevStep"
              type="button"
              class="btn btn-secondary"
              :disabled="index === 0"
            >
              Previous
            </button>
          </div>
          <div class="p-2">
            <button
              @click.prevent="nextStep"
              type="button"
              class="btn btn-primary me-2"
              :disabled="false"
            >
              {{ steps.length - 1 == index ? "Save & Continue" : "Next" }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- Forms -->
  </div>
</template>

<script setup language="ts">
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
  return Object.values(formData.value[index]).every(
    (value) => value.trim() !== ""
  );
};
</script>

<style scoped>
.progress-bar {
  cursor: pointer;
}
</style>
