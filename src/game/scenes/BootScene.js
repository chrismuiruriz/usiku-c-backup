import { Scene } from "phaser";
import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("paper", paper);
    this.load.audio("thud", [thudMp3, thudOgg]);
  }

  create() {
    this.scene.start("PlayScene");
  }
}
