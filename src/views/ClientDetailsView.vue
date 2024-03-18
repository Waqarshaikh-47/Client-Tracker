<template>
  <div class="container mt-5">
    <!-- Progress Tabs -->
    <div class="progress-tabs mb-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="progress-tab"
        :class="{
          active: index === currentStep,
          completed: index < currentStep,
        }"
        @click="setCurrentTab(index)"
      >
        <div class="progress-tab-content">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-name">{{ step.name }}</span>
        </div>
      </div>
    </div>
    <!-- Progress Tabs -->

    <!-- Forms -->
    <template v-for="(step, index) in steps" :key="index + step.componentName">
      <div v-show="index === currentStep">
        <component
          :is="step.componentName"
          @prev-step="prevStep"
          @next-step="nextStep"
          :legIndex="index"
          :isLastForm="index == steps.length - 1"
        />
      </div>
    </template>
    <!-- Forms -->
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, inject, onBeforeUnmount } from "vue";
import ClientInformation from "@/components/viewClientForms/ClientInformation.vue";
import MutualFunds from "@/components/viewClientForms/MutualFunds.vue";
import GoldInvestments from "@/components/viewClientForms/GoldInvestments.vue";
import FixedDeposit from "@/components/viewClientForms/FixedDeposit.vue";
import IndiaPostOffice from "@/components/viewClientForms/IndiaPostOffice.vue";
import InsurancePolicy from "@/components/viewClientForms/InsurancePolicy.vue";

const store:any = inject('store')
const steps = ref([
  { name: "Client Information", componentName: shallowRef(ClientInformation) },
  { name: "Mutual Fund", componentName: shallowRef(MutualFunds) },
  { name: "Gold Investment", componentName: shallowRef(GoldInvestments) },
  { name: "Fixed Deposit Info", componentName: shallowRef(FixedDeposit) },
  { name: "India Post Office", componentName: shallowRef(IndiaPostOffice) },
  { name: "Insurance Policy", componentName: shallowRef(InsurancePolicy) },
]);

onBeforeUnmount(() => {
  store.commit("setViewClientData", '');
});

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

const setCurrentTab = (index: any) => {
  currentStep.value = index;
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
