import { createStore } from "vuex";

// Define your initial state
const state = {
  user: {},
  clientInformationFormData: {
    fullName: "",
    panNumber: "",
    dob: "",
    email: "",
    phone: "",
  },
  fixedDepositFormData: {
    name: "",
    investmentAmount: "",
    annualInterestRate: "",
    startDate: "",
    tenure: "",
  },
  goldInvestmentFormData: {
    name: "",
    investmentValue: "",
    quantity: "",
    investmentDate: "",
    goldType: "",
  },
  indiaPostFormData: {
    name: "",
    annualInterestRate: "",
    startDate: "",
    tenureEndDate: "",
    compoundingFrequency: "",
  },
  insurancePolicyFormData: {
    name: "",
    startDate: "",
    policyNumber: "",
    planType: "",
    companyName: "",
    planName: "",
    paymentMode: "",
    premiumAmount: "",
    sumAssured: "",
    premiumPayTerm: "",
    policyTerm: "",
    maturityDate: "",
    remark: "",
  },
  mutualFundFormData: {
    name: "",
    startDate: "",
    investmentType: "",
    companyName: "",
    investmentAmount: "",
    remark: "",
  },
};

// Define mutations to update the state
const mutations = {
  setUser(state: any, data: object) {
    state.user = data;
  },
  setClientInformationFormData(state: any, data: object) {
    state.clientInformationFormData = data;
  },
  setFixedDepositFormData(state: any, data: object) {
    state.fixedDepositFormData = data;
  },
  setGoldInvestmentFormData(state: any, data: object) {
    state.goldInvestmentFormData = data;
  },
  setIndiaPostFormData(state: any, data: object) {
    state.indiaPostFormData = data;
  },
  setInsurancePolicyFormData(state: any, data: object) {
    state.insurancePolicyFormData = data;
  },
  setMutualFundFormData(state: any, data: object) {
    state.mutualFundFormData = data;
  },
};

// Create the Vuex store
const store = createStore({
  state,
  mutations,
});

export default store;
