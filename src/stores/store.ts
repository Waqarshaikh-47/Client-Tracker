import Vuex from "vuex";

export const store = new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state: any, user: object) {
      state.user = user;
    },
  },
});
