<template>
  <div>
    <img :src="PaperImg" />

    <hr />

    <span v-if="roomId">
      <h4>Room ID: {{ roomId }}</h4>
      <hr />
    </span>

    <h4>How will you play?</h4>

    <div>
      <button @click="createNewGame()" type="button">New Game</button>

      <hr />

      <form @submit.prevent="joinGameById()">
        <input
          v-model="roomId"
          type="text"
          placeholder="Enter Game ID"
          required
        />
        &nbsp;
        <button type="submit">Join by ID</button>
      </form>
    </div>

    <hr />

    <button @click="pauseGame()" type="button">Pause Game</button>

    <span>&nbsp;|&nbsp;</span>

    <button @click="resumeGame()" type="button">Resume Game</button>
    <span>&nbsp;|&nbsp;</span>

    <button type="button">Leave Game</button>
    <hr />
    <HelloWorld :jina="myName" />
    <hr />
    <audio controls>
      <source :src="audio.thudogg" type="audio/ogg" />
      <source :src="audio.thudmp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import PaperImg from "../assets/img/paper.png";
import thudogg from "../assets/media/thud.ogg";
import thudmp3 from "../assets/media/thud.mp3";
import HelloWorld from "../components/HelloWorld.vue";

import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myName: "Chris",
      PaperImg,
      audio: {
        thudmp3,
        thudogg,
      },
      roomId: null,
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions("game", ["pauseGame", "resumeGame"]),
    createNewGame() {
      this.$store.dispatch("game/startGame", {
        player_game_mode: "HOST",
        game_room_id: "NOTHING",
      });
    },
    joinGameById() {
      this.$store.dispatch("game/startGame", {
        player_game_mode: "GUEST",
        game_room_id: this.roomId,
      });
    },
  },
};
</script>

<style lang="scss">
body {
  color: #ff0000;
}
</style>
