<template>
    <div>
        <div class="form-data">
            <div v-if="includes(selectedForms , 'Client Information')">
                <h3>Client Information</h3>
          <p><strong>Full Name:</strong> {{ formData.clientInformationFormData.fullName }}</p>
          <p><strong>PAN Number:</strong> {{ formData.clientInformationFormData.panNumber }}</p>
          <p><strong>Date of Birth:</strong> {{ formData.clientInformationFormData.dob }}</p>
          <p><strong>Email:</strong> {{ formData.clientInformationFormData.email }}</p>
          <p><strong>Phone:</strong> {{ formData.clientInformationFormData.phone }}</p>
        </div>
        <div v-if="includes(selectedForms , 'Mutual Fund')">
            <h3>Mutual Fund</h3>
          <p><strong>Name:</strong> {{ formData.mutualFundFormData.name }}</p>
          <p><strong>Start Date:</strong> {{ formData.mutualFundFormData.startDate }}</p>
          <p><strong>Investment Type:</strong> {{ formData.mutualFundFormData.investmentType }}</p>
          <p><strong>Company Name:</strong> {{ formData.mutualFundFormData.companyName }}</p>
          <p>
            <strong>Investment Amount:</strong> {{ formData.mutualFundFormData.investmentAmount }}
          </p>
          <p><strong>Remark:</strong> {{ formData.mutualFundFormData.remark }}</p>
        </div>
        <div v-if="includes(selectedForms , 'Gold Investment')">
            <h3>Gold Investment</h3>
          <p><strong>Name:</strong> {{ formData.goldInvestmentFormData.name }}</p>
          <p><strong>Investment Value:</strong> {{ formData.goldInvestmentFormData.investmentValue }}</p>
          <p><strong>Quantity:</strong> {{ formData.goldInvestmentFormData.quantity }}</p>
          <p><strong>Investment Date:</strong> {{ formData.goldInvestmentFormData.investmentDate }}</p>
          <p><strong>Gold Type:</strong> {{ formData.goldInvestmentFormData.goldType }}</p>
        </div>
        <div v-if="includes(selectedForms , 'Fixed Deposit Info')">
            <h3>Fixed Deposit</h3>
          <p><strong>Name:</strong> {{ formData.fixedDepositFormData.name }}</p>
          <p>
            <strong>Investment Amount:</strong> {{ formData.fixedDepositFormData.investmentAmount }}
          </p>
          <p>
            <strong>Annual Interest Rate:</strong>
            {{ formData.fixedDepositFormData.annualInterestRate }}
          </p>
          <p><strong>Start Date:</strong> {{ formData.fixedDepositFormData.startDate }}</p>
          <p><strong>Tenure:</strong> {{ formData.fixedDepositFormData.tenure }}</p>
        </div>
        <div v-if="includes(selectedForms , 'India Post Office')">
            <h3>India Post</h3>
          <p><strong>Name:</strong> {{ formData.indiaPostFormData.name }}</p>
          <p>
            <strong>Annual Interest Rate:</strong>
            {{ formData.indiaPostFormData.annualInterestRate }}
          </p>
          <p><strong>Start Date:</strong> {{ formData.indiaPostFormData.startDate }}</p>
          <p><strong>Tenure End Date:</strong> {{ formData.indiaPostFormData.tenureEndDate }}</p>
          <p>
            <strong>Compounding Frequency:</strong>
            {{ formData.indiaPostFormData.compoundingFrequency }}
          </p>
        </div>
        <div v-if="includes(selectedForms , 'Insurance Policy')">
            <h3>Insurance Policy</h3>
          <p><strong>Name:</strong> {{ formData.insurancePolicyFormData.name }}</p>
          <p><strong>Start Date:</strong> {{ formData.insurancePolicyFormData.startDate }}</p>
          <p><strong>Policy Number:</strong> {{ formData.insurancePolicyFormData.policyNumber }}</p>
          <p><strong>Plan Type:</strong> {{ formData.insurancePolicyFormData.planType }}</p>
          <p><strong>Company Name:</strong> {{ formData.insurancePolicyFormData.companyName }}</p>
          <p><strong>Plan Name:</strong> {{ formData.insurancePolicyFormData.planName }}</p>
          <p><strong>Payment Mode:</strong> {{ formData.insurancePolicyFormData.paymentMode }}</p>
          <p><strong>Premium Amount:</strong> {{ formData.insurancePolicyFormData.premiumAmount }}</p>
          <p><strong>Sum Assured:</strong> {{ formData.insurancePolicyFormData.sumAssured }}</p>
          <p><strong>Premium Pay Term:</strong> {{ formData.insurancePolicyFormData.premiumPayTerm }}</p>
          <p><strong>Policy Term:</strong> {{ formData.insurancePolicyFormData.policyTerm }}</p>
          <p><strong>Maturity Date:</strong> {{ formData.insurancePolicyFormData.maturityDate }}</p>
          <p><strong>Remark:</strong> {{ formData.insurancePolicyFormData.remark }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useStore } from "vuex";
  import {includes} from "lodash"
  const store = useStore()
  const props = defineProps<{
    selectedForms: Array<string>,
  }>();
  const formTitle = ref("");

  const formData = ref<any>(store.state.viewClientData.clientData)  
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
  