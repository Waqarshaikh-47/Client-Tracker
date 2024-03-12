import Vuex from "vuex";

export const store = new Vuex.Store({
  state: {
    user: {},
    clientInformationFormData: {
      fullName: '',
      panNumber: '',
      dob: '',
      email: '',
      phone: '',
    }
  },
  mutations: {
    setUser(state: any, data: object) {
      state.user = data;
    },
  setClientInformationFormData(state: any, data: any) {
      state.clientInformationFormData = data;
    },
  },
});
