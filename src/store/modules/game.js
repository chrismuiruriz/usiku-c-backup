const state = () => ({
  isPaused: false,
  isGameInitialized: false,
  gameRoomPassId: "",
  gameRoomId: "",
  playerGameMode: null, // HOST or GUEST
});

const getters = {
  getGameRoomId: (state) => state.gameRoomId,
  getPlayerGameMode: (state) => state.playerGameMode,
  getIsGameInitiazed: (state) => state.isGameInitialized,
};

const actions = {
  resumeGame({ commit }) {
    commit("gameResumed");
  },

  pauseGame({ commit }) {
    commit("gamePaused");
  },

  initializeGame({ commit }) {
    commit("initializeGame");
  },

  startGame({ commit }, { player_game_mode, game_room_id }) {
    commit("setGameRoomId", game_room_id);
    commit("gameStarted", player_game_mode);
  },
};

const mutations = {
  gameResumed(state) {
    state.isPaused = false;
  },
  gamePaused(state) {
    state.isPaused = true;
  },
  initializeGame(state) {
    state.isGameInitialized = true;
  },
  setGameRoomId(state, game_room_id) {
    state.gameRoomId = game_room_id;
  },
  gameStarted(state, player_game_mode) {
    state.playerGameMode = player_game_mode;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
