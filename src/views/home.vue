<template>
  <div>
    <img :src="PaperImg" />

    <hr />

    <button @click="pauseGame()" type="button">Pause Game</button>

    <span>&nbsp;|&nbsp;</span>

    <button @click="resumeGame()" type="button">Resume Game</button>
    <hr />
    <HelloWorld :jina="myName" />
    <hr />
    <img
      src="https://webomnizz.com/wp-content/uploads/2020/03/webpack_and_vuejs-1024x576.jpg"
    />
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
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions("game", ["pauseGame", "resumeGame"]),
  },
};
</script>

<style lang="scss">
body {
  color: #ff0000;
}
</style>
