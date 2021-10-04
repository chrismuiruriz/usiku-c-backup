const state = () => ({
  isPaused: false,
});

const getters = {};

const actions = {
  resumeGame({ commit }) {
    commit("gameResumed");
  },

  pauseGame({ commit }) {
    commit("gamePaused");
  },
};

const mutations = {
  gameResumed(state) {
    state.isPaused = false;
  },
  gamePaused(state) {
    state.isPaused = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
