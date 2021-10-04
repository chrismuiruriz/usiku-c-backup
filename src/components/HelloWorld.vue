<template>
  <div>
    <div class="hello-wrapper" v-if="!initialize">
      <h1>Hello {{ jina }}</h1>
      <div class="flex">
        <a href="#" class="bttn" @click.prevent="initializeGame">Initialize</a>
      </div>
    </div>
    <div class="game-container">
      <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
    </div>
  </div>
</template>

<script>
//import Phaser from "phaser";
import gameConfig from "../game/game";

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
  methods: {
    initializeGame: function() {
      this.initialize = true;
    },
  },
};
</script>

<style scoped lang="scss">
.hello-wrapper {
  padding: 1rem;
  color: #cccccc;
  background-color: black;
}
.game-container {
  text-align: center;
  ion-phaser {
    margin: 0 auto;
  }
}
</style>
