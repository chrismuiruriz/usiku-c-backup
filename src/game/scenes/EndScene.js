import { Scene } from "phaser";

import endElder from "../../assets/img/end/elder.png";
import endKids from "../../assets/img/end/kids.png";
import endBg from "../../assets/img/end/bg.png";

export default class EndScene extends Scene {
  constructor() {
    super({
      key: "EndScene",
    });
  }

  preload() {
    this.load.image("end-bg", endBg);
    this.load.image("end-elder", endElder);
    this.load.image("end-kids", endKids);
  }

  async create(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "end-bg")
      .setOrigin(0.5);

    let elder = this.add.image(0, 0, "end-elder").setOrigin(0.5);
    elder.x = this.screenWidth - elder.width / 2;
    elder.y = this.screenHeight - elder.height / 2;

    this.input.on("pointerup", (pointer) => {
      this.startNextScene();
    });

    let characters = this.add.image(0, 0, "end-kids");
    characters.x = characters.width / 2;
    characters.y = this.screenHeight - characters.height / 2;

    this.createChatBubbles(
      this.screenCenterX + 50,
      this.screenCenterY - 150,
      0,
      1
    );
  }

  createChatBubbles(x, y, angle, frame) {
    let b = this.add
      .image(x, y, "chat-time-bubble")
      .setOrigin(0, 1)
      .setFrame(frame);

    let tX = b.x;
    let tY = b.y;

    let t = this.add
      .bitmapText(
        0,
        0,
        "natural-log",
        "Congratulations, you have helped\nclean up the river. Well done!",
        30,
        1
      )
      .setAngle(angle);

    if (frame == 3 || frame == 2) {
      tX = b.x + b.width / 2 + t.width / 2;
      tY = b.y - b.height / 2 + t.height / 2 + 15;
    } else {
      tX = b.x + b.width / 2 - t.width / 2;
      tY = b.y - b.height / 2 - t.height / 2 - 15;
    }

    t.x = tX;
    t.y = tY;
  }

  startNextScene() {
    this.scene.stop("EndScene");
    this.scene.start("LoadingScene", {
      server: {},
      onGameOver: {},
    });
  }
}
