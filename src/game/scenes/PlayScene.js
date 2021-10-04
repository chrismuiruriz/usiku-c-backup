import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  create() {
    const bomb = this.physics.add.image(400, 200, "paper");
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);

    this.sound.add("thud");
    this.physics.world.on("worldbounds", () => {
      this.sound.play("thud", { volume: 0.75 });
    });

    //let's see if we can listen for store events
    store.watch(
      (state) => state.game.isPaused,
      (newValue, oldValue) => {
        console.log(`IsGamePaused was`, oldValue);
        console.log(`IsGamePaused is now`, newValue);
        if (newValue) {
          this.scene.pause("PlayScene");
        } else {
          this.scene.resume("PlayScene");
        }
      }
    );

    store.subscribe((mutation, state) => {
      console.log(`Mutation detected`, mutation);
    });
  }

  update() {}
}
