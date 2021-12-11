<template>
  <div class="pre-ui-el">
    <!-- Game Canvas -->
    <div id="game-canvas">
      <HelloWorld :jina="name_" />
    </div>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      myName: "Chris",
      name_: "Creaw",
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
  created() {},
  mounted() {},
  methods: {
    ...mapActions("game", [
      "pauseGame",
      "resumeGame",
      "resetState",
      "restartGame",
    ]),
    showIntialScreen() {
      return this.getPlayerGameMode === null ||
        this.getHasJoinGameError === true
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
