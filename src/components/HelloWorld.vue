<template>
  <ion-phaser v-bind:game.prop="game" v-bind:initialize.prop="initialize" />
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
  created() {
    this.initializeTheGame();
  },
  methods: {
    initializeTheGame: function() {
      this.initialize = true;
    },
  },
};
</script>
