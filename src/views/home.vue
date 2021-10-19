<template>
  <div class="page-wrapper">
    <HelloWorld :jina="myName" />

    <div class="initial-screen" v-show="showIntialScreen()">
      <!-- game Logo/Brand -->
      <div class="logo">
        <span>X</span>
        <span>O</span>
      </div>

      <div class="choose-play-mode" v-show="!showGameIdForm">
        <div class="title-wrapper">
          <span>Choose your play mode</span>
        </div>

        <!-- Game Mode Buttons-->
        <div>
          <div class="button-wrapper">
            <button
              @click="createNewGame()"
              type="button"
              class="button primary"
            >
              New Game
            </button>
          </div>

          <div class="button-wrapper">
            <button type="button" @click="toggleGameIdForm()" class="button">
              Join Game
            </button>
          </div>
        </div>
      </div>

      <!-- Game ID -->
      <div class="enter-game-id" v-show="showGameIdForm">
        <div class="title-wrapper">
          <span>Enter Game ID</span>
        </div>

        <form @submit.prevent="joinGameById()">
          <div class="input-wrapper">
            <input
              v-model="roomId"
              type="text"
              placeholder="Enter Game ID"
              required
            />
          </div>

          <div class="text-red" v-if="getHasJoinGameError">
            Game ID <strong>{{ roomId }}</strong> not found!
          </div>

          <div class="button-wrapper">
            <button type="submit" class="button primary">Join</button>
          </div>
        </form>

        <div class="button-wrapper back-button">
          <button
            type="button"
            @click="toggleGameIdForm()"
            class="plain with-icon"
          >
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="45.58px"
              height="45.58px"
              viewBox="0 0 45.58 45.58"
              style="enable-background:new 0 0 45.58 45.58;"
              xml:space="preserve"
            >
              <g>
                <path
                  fill="#3677f9"
                  d="M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113
		c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909
		c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313
		c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="footer" v-if="getGameOver">
      <div class="button-wrapper">
        <button @click="restartGame()" type="button" class="button primary">
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import PaperImg from "../assets/img/paper.png";
import thudogg from "../assets/media/thud.ogg";
import thudmp3 from "../assets/media/thud.mp3";
import HelloWorld from "../components/HelloWorld.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myName: "Chris",
      audio: {
        thudmp3,
        thudogg,
      },
      roomId: null,
      showGameIdForm: false,
    };
  },
  computed: {
    ...mapGetters("game", [
      "getPlayerGameMode",
      "getHasJoinGameError",
      "getPlayerTurnText",
      "getGameOver",
    ]),
  },
  components: {
    HelloWorld,
  },
  created() {
    this.resetState();
  },
  methods: {
    ...mapActions("game", ["pauseGame", "resumeGame", "resetState", "restartGame"]),
    async createNewGame() {
      await this.resetState();

      this.$store.dispatch("game/startGame", {
        player_game_mode: "HOST",
        game_room_id: "NOTHING",
      });
    },
    async joinGameById() {
      await this.resetState();

      this.$store.dispatch("game/startGame", {
        player_game_mode: "GUEST",
        game_room_id: this.roomId,
      });
    },
    async toggleGameIdForm() {
      this.roomId = null;
      await this.resetState();

      this.showGameIdForm = !this.showGameIdForm;
    },
    showIntialScreen() {
      return this.getPlayerGameMode === null ||
        this.getHasJoinGameError === true
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-red {
  color: red;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: 100;
}

.page-wrapper {
  position: relative;
}

.initial-screen {
  z-index: 100;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  background-color: #f6f8f7;
}

.logo {
  margin-bottom: 1.5rem;
  span {
    font-size: 4.5rem;
    font-weight: 900;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    &:first-child {
      color: #3677f9;
      background: -webkit-linear-gradient(#3677f9, #88ddd6);
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 6px 4px 6px #3677f985;
    }
    &:last-child {
      color: #f87235;
      background: -webkit-linear-gradient(#f87235, #f2d26d);
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 6px 4px 6px #f8723585;
    }
  }
}

.title-wrapper {
  text-align: center;
  span {
    font-size: 1.25rem;
    color: #66718f;
    display: inline-block;
  }
}

.choose-play-mode {
  .title-wrapper {
    margin-bottom: 2rem;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 2rem;
  z-index: 200;
}

.enter-game-id {
  .title-wrapper {
    margin-bottom: 1rem;
  }
}

.back-button {
  margin-top: 2.5rem;
}
</style>
