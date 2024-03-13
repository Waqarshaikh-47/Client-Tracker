import { createStore } from 'vuex';
import { ClientInformation } from '@/schemas/forms/ClientInformation';


// Define your initial state
const state = {
  user: {},
  clientInformationFormData: {
    fullName: '',
    panNumber: '',
    dob: '',
    email: '',
    phone: '',
  }
};

// Define mutations to update the state
const mutations = {
  setUser(state: any, data: object) {
    state.user = data;
  },
setClientInformationFormData(state: any, data: any) {
    state.clientInformationFormData = data;
  },
};

// Create the Vuex store
const store = createStore({
  state,
  mutations,
});

export default store;
