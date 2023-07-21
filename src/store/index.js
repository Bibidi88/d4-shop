import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    loginModal: false
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setLoginModal(state, loginModal) {
      state.loginModal = loginModal
    }
  },
  actions: {},
  modules: {},
  getters: {
    isLoggedIn: state => !!state.user,
  },
});

export default store;
