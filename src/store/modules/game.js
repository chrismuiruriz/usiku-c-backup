const state = () => ({
  isPaused: false,
  isGameInitialized: false,
  gameRoomPassId: "",
  gameRoomId: "",
  gameRoomDisplayId: "",
  playerGameMode: null, // HOST or GUEST
  hasJoinGameError: false,
});

const getters = {
  getGameRoomId: (state) => state.gameRoomId,
  getPlayerGameMode: (state) => state.playerGameMode,
  getIsGameInitiazed: (state) => state.isGameInitialized,
  getGameRoomDisplayId: (state) => state.gameRoomDisplayId,
  getHasJoinGameError: (state) => state.hasJoinGameError,
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

  storeGameRoomDisplayId({ commit }, { game_room_display_id }) {
    commit("setGameRoomDisplayId", game_room_display_id);
  },

  updateHasJoinGameError({ commit }, { hasError }) {
    commit("setHasJoinGameError", hasError);
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
  setGameRoomDisplayId(state, game_room_display_id) {
    state.gameRoomDisplayId = game_room_display_id;
  },
  setHasJoinGameError(state, hasError) {
    state.hasJoinGameError = hasError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
