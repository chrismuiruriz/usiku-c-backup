import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  init() {}

  async create(data) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

    this.sound.add("thud");

    //grid
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const screenCenterX = this.cameras.main.worldView.x + screenWidth / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenHeight / 2;

    const grid = this.add
      .grid(
        screenCenterX,
        screenCenterY,
        screenWidth,
        screenHeight,
        64,
        64,
        0x057605
      )
      .setOrigin(0.5);

    //let's see if we can listen for vue store events
    store.subscribe((mutation, state) => {
      //TODO: Something awesome
    });
  }

  update() {}
}
