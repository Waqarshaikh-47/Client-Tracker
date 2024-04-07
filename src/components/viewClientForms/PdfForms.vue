<template>
  <div>
    <div v-for="(forms, formIndex) in printFormsData" :key="formIndex">
      <h3>
        {{ beautifyName(formIndex.toString()) }}
      </h3>

      <div class="" v-if="formIndex.toString() == 'clientInformationFormData'">
        <div v-for="(formData, i) in forms" :key="i" class="my-3">
          <p><strong>Full Name:</strong> {{ formData.fullName }}</p>
          <p><strong>PAN Number:</strong> {{ formData.panNumber }}</p>
          <p><strong>Date of Birth:</strong> {{ formData.dob }}</p>
          <p><strong>Email:</strong> {{ formData.email }}</p>
          <p><strong>Phone:</strong> {{ formData.phone }}</p>
          <hr>
        </div>
      </div>
      <div class="" v-if="formIndex.toString() == 'mutualFundFormData'">
        <div v-for="(formData, i) in forms" :key="i" class="my-3">
          <p><strong>Name:</strong> {{ formData.companyName }}</p>
          <p><strong>Start Date:</strong> {{ formData.startDate }}</p>
          <p><strong>Investment Type:</strong> {{ formData.investmentType }}</p>
          <p><strong>Company Name:</strong> {{ formData.companyName }}</p>
          <p>
            <strong>Investment Amount:</strong> {{ formData.investmentAmount }}
          </p>
          <p><strong>Remark:</strong> {{ formData.remark }}</p>
          <hr>
        </div>
      </div>
      <div class="" v-if="formIndex.toString() == 'fixedDepositFormData'">
        <div v-for="(formData, i) in forms" :key="i">
          <p><strong>Name:</strong> {{ formData.name }}</p>
          <p>
            <strong>Investment Amount:</strong> {{ formData.investmentAmount }}
          </p>
          <p>
            <strong>Annual Interest Rate:</strong>
            {{ formData.annualInterestRate }}
          </p>
          <p><strong>Start Date:</strong> {{ formData.startDate }}</p>
          <p><strong>Tenure:</strong> {{ formData.tenure }}</p>
          <hr>
        </div>
      </div>
      <div class="" v-if="formIndex.toString() == 'indiaPostFormData'">
        <div v-for="(formData, i) in forms" :key="i">
          <p><strong>Name:</strong> {{ formData.name }}</p>
          <p>
            <strong>Annual Interest Rate:</strong>
            {{ formData.annualInterestRate }}
          </p>
          <p><strong>Start Date:</strong> {{ formData.startDate }}</p>
          <p><strong>Tenure End Date:</strong> {{ formData.tenureEndDate }}</p>
          <p>
            <strong>Compounding Frequency:</strong>
            {{ formData.compoundingFrequency }}
          </p>
          <hr>
        </div>
      </div>
      <div class="" v-if="formIndex.toString() == 'goldInvestmentFormData'">
        <div v-for="(formData, i) in forms" :key="i">
          <p><strong>Name:</strong> {{ formData.name }}</p>
          <p><strong>Investment Value:</strong> {{ formData.investmentValue }}</p>
          <p><strong>Quantity:</strong> {{ formData.quantity }}</p>
          <p><strong>Investment Date:</strong> {{ formData.investmentDate }}</p>
          <p><strong>Gold Type:</strong> {{ formData.goldType }}</p>
          <hr>
        </div>
      </div>
      <div class="" v-if="formIndex.toString() == 'insurancePolicyFormData'">
        <div v-for="(formData, i) in forms" :key="i">
          <p><strong>Name:</strong> {{ formData.name }}</p>
          <p><strong>Start Date:</strong> {{ formData.startDate }}</p>
          <p><strong>Policy Number:</strong> {{ formData.policyNumber }}</p>
          <p><strong>Plan Type:</strong> {{ formData.planType }}</p>
          <p><strong>Company Name:</strong> {{ formData.companyName }}</p>
          <p><strong>Plan Name:</strong> {{ formData.planName }}</p>
          <p><strong>Payment Mode:</strong> {{ formData.paymentMode }}</p>
          <p><strong>Premium Amount:</strong> {{ formData.premiumAmount }}</p>
          <p><strong>Sum Assured:</strong> {{ formData.sumAssured }}</p>
          <p><strong>Premium Pay Term:</strong> {{ formData.premiumPayTerm }}</p>
          <p><strong>Policy Term:</strong> {{ formData.policyTerm }}</p>
          <p><strong>Maturity Date:</strong> {{ formData.maturityDate }}</p>
          <p><strong>Remark:</strong> {{ formData.remark }}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue"; // Import defineProps
import { useStore } from "vuex";
import { includes } from "lodash";

const store = useStore();
const props = defineProps<{
  selectedForms: Array<any>,
}>();
const formTitle = ref("");
const formData = ref<any>(store.state.viewClientData.clientData);
const printFormsData = ref<any>({}); // Initialize data as an empty object

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

watch(() => props.selectedForms, (newValue, oldValue) => {
  // Initialize an empty object to store updated form data
  const updatedPrintFormsData:any = {};

  // Iterate through selectedForms to filter out unchecked forms
  for (const form of newValue) {
    if (form.value !== null && form.value !== undefined && form.value !== "") {
      if (updatedPrintFormsData.hasOwnProperty(form.index)) {
        // Append form.value to the existing key
        updatedPrintFormsData[form.index].push(form.value);
      } else {
        // Create a new key and set its value as an array containing form.value;
        updatedPrintFormsData[form.index] = [form.value];
      }
    }
  }

  // Replace printFormsData with the updated data
  printFormsData.value = updatedPrintFormsData;
});

</script>

<style>
.form-data {
  margin-top: 20px;
}

.form-data p {
  margin-bottom: 5px;
}

.form-data strong {
  font-weight: bold;
}
</style>
