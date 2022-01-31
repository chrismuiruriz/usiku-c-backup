import { Scene } from "phaser";

export default class StartScene extends Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }

  async create(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "start-scene-bg")
      .setOrigin(0.5);

    this.soundButtonClick = this.sound.add("s-button-click");

    let gameLogo = this.add
      .image(this.screenCenterX, 0, "game-logo")
      .setOrigin(0.5);
    gameLogo.y = this.screenCenterY - 100;

    this.startButton = this.add
      .sprite(
        this.screenCenterX,
        gameLogo.y + gameLogo.height + 50,
        "start-btn"
      )
      .setFrame(0);
    this.startButton.setInteractive();

    this.startButton.on("pointerover", (pointer) => {
      this.startButton.setFrame(1);
    });

    this.startButton.on("pointerout", (pointer) => {
      this.startButton.setFrame(0);
    });

    this.startButton.on("pointerup", (pointer) => {
      this.soundButtonClick.play();
      this.startButton.setFrame(1);
      this.toggleFullScreen();
      this.startNextScene();
    });

    this.characters = this.add.image(0, 0, "start-scene-characters");
    this.characters.x = this.screenWidth - this.characters.width / 2;
    this.characters.y = this.screenHeight - this.characters.height / 2;
  }

  startNextScene() {
    this.scene.start("StoryScene", {
      server: {},
      onGameOver: {},
    });
    this.scene.stop("StartScene");
  }

  toggleFullScreen() {
    this.scale.startFullscreen();
  }
}
