<template>
  <div class="container mt-5">
    <!-- Progress Tabs -->
    <button class="btn btn-primary mt-1 mb-1" data-bs-toggle="modal" data-bs-target="#printPdfModal">
      <i class="bi bi-file-pdf"></i> Print PDF
    </button>

    <div class="progress-tabs mb-4">
      <div v-for="(step, index) in steps" :key="index" class="progress-tab" :class="{
        active: index === currentStep,
        completed: index < currentStep,
      }" @click="setCurrentTab(index)">
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
        <component :is="step.componentName" @prev-step="prevStep" @next-step="nextStep" :legIndex="index"
          :isLastForm="index == steps.length - 1" />
      </div>
    </template>
    <!-- Forms -->
    <!-- Models Start-->
    <div class="modal fade" id="printPdfModal" tabindex="-1" aria-labelledby="printPdfModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header">
            <h5 class="modal-title" id="printPdfModalLabel">Print PDF</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p>Select forms to include in the PDF:</p>
              <!-- {{ forms }} -->
              <template class="form-check d-flex flex-column" v-for="(form, index) in forms.clientData" :key="index">
                <template v-if="index.toString() !== 'fillerInfo' && index.toString() !== 'lastUpdated' && index.toString() !== 'startDate'
        && form.length">
                  <div>
  <div class="m-2">
    <button class="btn btn-primary" type="button" @click="toggleCollapse(index)">
      {{ beautifyName(index.toString()) }}s
      <i :class="['bi', isCollapsed[index] ? 'bi-chevron-down' : 'bi-chevron-up']"></i>
    </button>
    <div class="collapse" :id="`collapseForm${index}`" :class="{ show: isCollapsed[index] }">
      <div class="list-group">
        <div v-for="(formField, formIndex) in form" :key="formIndex" class="list-group-item">
          <input class="form-check-input" type="checkbox" :id="`form${index}_${formIndex}`"
            :value="{index:index,value:formField, formId:formIndex}" v-model="selectedForms">
          <label class="form-check-label ms-3" :for="`form${index}`">
            <i class="bi bi-journal"></i> {{ formField.name ? formField.name : formField.companyName }}
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

                </template>
              </template>
            </div>
            <!-- Add your PDF content here -->
            <div ref="printContent" style="display: none;">
              <h1>GrowSmart Finserv</h1>
              <PdfForms :selected-forms="selectedForms" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="printPdf">Print</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Models End-->
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
import PdfForms from "@/components/viewClientForms/PdfForms.vue"
import * as bootstrap from "bootstrap"; // Import all exports from the 'bootstrap' module

const store: any = inject('store')
const authModal: any = ref<bootstrap.Modal>();
const steps = ref([
  { name: "Client Information", componentName: shallowRef(ClientInformation) },
  { name: "Mutual Fund", componentName: shallowRef(MutualFunds) },
  { name: "Insurance Policy", componentName: shallowRef(InsurancePolicy) },
  { name: "Gold Investment", componentName: shallowRef(GoldInvestments) },
  { name: "Fixed Deposit Info", componentName: shallowRef(FixedDeposit) },
  { name: "India Post Office", componentName: shallowRef(IndiaPostOffice) },
]);

let forms = ref(store.state.viewClientData)
let selectedForms = ref([]);
let selectedSubForms = ref(Array.from({ length: forms.value.clientData.length }, () => [])); // Initialize with empty arrays for each form
let isCollapsed = ref(Array.from({ length: forms.value.clientData.length }, () => true)); // Initialize all as collapsed

onBeforeUnmount(() => {
  let initializeClientData = {
    id: '',
    clientData: {
      clientInformationFormData: {},
      fillerInfo: {},
      fixedDepositFormData: {},
      goldInvestmentFormData: {},
      indiaPostFormData: {},
      insurancePolicyFormData: {},
      lastUpdated: "",
      mutualFundFormData: {},
      startDate: ""
    }
  }
  store.commit("setViewClientData", initializeClientData);
});

const currentStep = ref(0);
const beautifyName = (name: string) => {
  switch (name) {
    case "clientInformationFormData":
      return 'Client Information'
    case "fixedDepositFormData":
      return 'Fixed Deposit'
    case "goldInvestmentFormData":
      return 'Gold Investment'
    case "indiaPostFormData":
      return 'India Post'
    case "mutualFundFormData":
      return 'Mutual Fund'
    case "insurancePolicyFormData":
      return 'Insurance Police'
    default:
      break;
  }
}

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

const toggleCollapse = (index: number) => {
  isCollapsed.value[index] = !isCollapsed.value[index];
};

const printPdf = () => {
  printPDF();
}

const printContent: any = ref(null);

const printPDF = () => {
  const content = printContent.value;

  if (!content) {
    console.error('Print content element not found');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Failed to open print window');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GrowSmart</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
  printWindow.document.close();
  printWindow.print();
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

.btn-group-lg>.btn,
.btn-lg {
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
}
.backgroundColorCollapse{
  background-color: #5a6268;
  border-color: #2c72af;
  border: 20px;
  font-weight: bold;
}
</style>
