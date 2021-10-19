<template>
  <div class="game-container">
    <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
  </div>
</template>

<script>
//import Phaser from "phaser";
import gameConfig from "../game/game";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    jina: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initialize: false,
      game: gameConfig,
    };
  },
  created() {
    this.initializeTheGame();
  },
  methods: {
    ...mapActions("game", ["initializeGame"]),
    initializeTheGame: function() {
      this.initializeGame();
      this.initialize = true;
    },
  },
};
</script>

<style scoped lang="scss">
.game-container {
  position: absolute;
  top: 0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f8f7;
  ion-phaser {
    margin: 0 auto;
  }
}
</style>
