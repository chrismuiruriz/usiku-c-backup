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

export default {
  name: "Home",
  data() {
    return {
      myName: "Chris",
      name_: "Creaw",
    };
  },
  components: {
    HelloWorld,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
