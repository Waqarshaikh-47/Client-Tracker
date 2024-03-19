import { createStore } from "vuex";

// Define your initial state
const state = {
  user: {},
  clientId:'',
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
  isLoading: false,
  viewClientData : {
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
};

// Define mutations to update the state
const mutations = {
  setUser(state: any, data: object) {
    state.user = data;
  },
  setClientId(state: any, id:string){
    state.clientId = id;
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
  setLoading(state: any, status:boolean) {
    state.isLoading = status;
  },
  setViewClientData(state: any, data:object) {
    state.viewClientData = data;
  },
};

// Create the Vuex store
const store = createStore({
  state,
  mutations,
});

export default store;
