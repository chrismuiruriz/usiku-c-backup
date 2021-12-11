import { Scene } from "phaser";

import howToPlayLabel from "../../assets/img/take-position/labels-168x49.png";
import howToPlayBg from "../../assets/img/common/game-bg-no-filter.png";

import howToPlayBoard from "../../assets/img/how-to-play/board-bottom.png";

export default class HowToPlayScene extends Scene {
  constructor() {
    super({
      key: "HowToPlayScene",
    });
  }

  preload() {
    this.load.image(`how-to-play-bg`, howToPlayBg);
    this.load.spritesheet(`how-to-play-label`, howToPlayLabel, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`how-to-play-board`, howToPlayBoard);
  }

  create(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 0;

    this.selectionCounter = 0;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "how-to-play-bg")
      .setOrigin(0.5);

    this.createBoards();

    this.createButtons();
  }

  createBoards() {
    this.boardTL = this.add.sprite(0, 0, "how-to-play-board").setAngle(180);
    this.boardTL.x = this.boardTL.width / 2;
    this.boardTL.y = this.boardTL.height / 2;

    this.boardTR = this.add.sprite(0, 0, "how-to-play-board").setAngle(180);
    this.boardTR.x = this.screenWidth - this.boardTR.width / 2;
    this.boardTR.y = this.boardTR.height / 2;

    this.boardBR = this.add.sprite(0, 0, "how-to-play-board");
    this.boardBR.x = this.screenWidth - this.boardBR.width / 2;
    this.boardBR.y = this.screenHeight - this.boardBR.height / 2;

    this.boardBL = this.add.sprite(0, 0, "how-to-play-board");
    this.boardBL.x = this.boardBL.width / 2;
    this.boardBL.y = this.screenHeight - this.boardBL.height / 2;
  }

  createButtons() {
    this.styleConfig = {
      fill: "#FFFFFF",
      font: "15px cursive",
      align: "center",
      wordWrap: { width: this.boardTL.width - 30, useAdvancedWrap: true },
    };

    this.labLabel = this.add.image(this.boardTL.x, 0, "how-to-play-label");
    this.labLabel.y =
      this.boardTL.y + this.boardTL.height / 2 - this.labLabel.height;
    this.labLabel.setFrame(3);

    this.textTL = this.add
      .text(
        this.labLabel.x,
        0,
        `Pebbles will enter the screen from one side. Match 2 pebbles
      of the same color in a row to get a point. Control the pebbles
      by tapping the green arrows on the screen. Pebbles can be
      matched horizontally or vertically.`,
        this.styleConfig
      )
      .setOrigin(0.5, 0)
      .setAngle(180);
    this.textTL.width = this.boardTL.width - 15;
    this.textTL.y = this.labLabel.y - this.labLabel.height;

    this.topLeftButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180)
      .setScale(0.8);
    this.topLeftButton.x = this.topLeftButton.width / 2;
    this.topLeftButton.y = this.topLeftButton.height / 2;
    this.topLeftButton.setInteractive();

    this.topLeftButton.on("pointerdown", (pointer) => {
      this.topLeftButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });

    /*********************/

    this.farmLabel = this.add.image(this.boardTR.x, 0, "how-to-play-label");
    this.farmLabel.y =
      this.boardTR.y + this.boardTR.height / 2 - this.farmLabel.height;
    this.farmLabel.setFrame(2);

    this.textTR = this.add
      .text(
        this.farmLabel.x,
        0,
        `The boat shall arrive from the factory and will display an icon.
        Slide the icon into the “Organic” or “Inorganic” bubble. Make
        sure you slide the icon into the correct bubble
        (Organic/Inorganic) in order to gain a point.`,
        this.styleConfig
      )
      .setOrigin(0.5, 0)
      .setAngle(180)
      .setScale(0.8);
    this.textTR.width = this.boardTR.width - 15;
    this.textTR.y = this.farmLabel.y - this.farmLabel.height;

    this.topRightButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180)
      .setScale(0.8);
    this.topRightButton.x = this.screenWidth - this.topRightButton.width / 2;
    this.topRightButton.y = this.topRightButton.height / 2;
    this.topRightButton.setInteractive();

    this.topRightButton.on("pointerdown", (pointer) => {
      this.topRightButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });

    /*********************/

    this.factoryLabel = this.add.image(this.boardBR.x, 0, "how-to-play-label");
    this.factoryLabel.y =
      this.boardBR.y - this.boardBR.height / 2 + this.factoryLabel.height;
    this.factoryLabel.setFrame(1);
    this.textBR = this.add
      .text(
        this.factoryLabel.x,
        0,
        `Answer a math question once the forklifts arrive from the
        digger. Make sure not to get the incorrect answer or take too
        long, or else the forklifts will get stuck in the traffic,
        creating a queue to get into the factory.`,
        this.styleConfig
      )
      .setOrigin(0.5, 0);
    this.textBR.width = this.boardBR.width - 15;
    this.textBR.y = this.factoryLabel.y + this.factoryLabel.height;

    this.bottomRightButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setScale(0.8);
    this.bottomRightButton.x =
      this.screenWidth - this.bottomRightButton.width / 2;
    this.bottomRightButton.y =
      this.screenHeight - this.bottomRightButton.height / 2;
    this.bottomRightButton.setInteractive();

    this.bottomRightButton.on("pointerdown", (pointer) => {
      this.bottomRightButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });

    /*********************/

    this.excavatorLabel = this.add.image(
      this.boardBL.x,
      0,
      "how-to-play-label"
    );
    this.excavatorLabel.y =
      this.boardBL.y - this.boardBL.height / 2 + this.excavatorLabel.height;
    this.excavatorLabel.setFrame(0);
    this.textBL = this.add
      .text(
        this.excavatorLabel.x,
        0,
        `Tap the digger on the screen to grab objects floating down the
        river. Make sure you tap the screen at the right time in order
        to capture the rubbish flowing down. If you tap at the wrong
        time, you will collect nothing.`,
        this.styleConfig
      )
      .setOrigin(0.5, 0);
    this.textBL.width = this.boardBL.width - 15;
    this.textBL.y = this.excavatorLabel.y + this.excavatorLabel.height;

    this.bottomLeftButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setScale(0.8);
    this.bottomLeftButton.x = this.bottomLeftButton.width / 2;
    this.bottomLeftButton.y =
      this.screenHeight - this.bottomLeftButton.height / 2;
    this.bottomLeftButton.setInteractive();

    this.bottomLeftButton.on("pointerdown", (pointer) => {
      this.bottomLeftButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });
  }

  createNavigationButtons() {
    this.backBtn = this.add.sprite(50, 50, "navigation-btn").setFrame(0);
    this.backBtn.setInteractive();

    this.backBtn.on("pointerdown", (pointer) => {
      this.scene.start("StartScene", {
        server: {},
        onGameOver: {},
      });
    });

    this.closeBtn = this.add
      .sprite(50, this.backBtn.y + this.backBtn.height + 10, "navigation-btn")
      .setFrame(1)
      .setInteractive();

    this.closeBtn.on("pointerdown", (pointer) => {
      this.scene.start("LoadingScene", {
        server: {},
        onGameOver: {},
      });
    });
  }

  checkIfAllSelected() {
    if (this.selectionCounter >= 4) {
      this.startNextScene();
    }
  }

  startNextScene() {
    this.scene.stop("HowToPlayScene");
    this.scene.start("PlayScene", {
      server: {},
      onGameOver: {},
    });
  }
}
