import { Scene } from "phaser";
import store from "../../store";

import bg from "../../assets/img/chat-time/chat-time-bg.png";
import chatTimeText from "../../assets/img/chat-time/chat-time.png";

import chatTop from "../../assets/img/take-position/chat-top.png";
import chatBottom from "../../assets/img/take-position/chat-bottom.png";

export default class ChatTimeScene extends Scene {
  constructor() {
    super({
      key: "ChatTimeScene",
    });
  }

  init() {
    this.gameTimerDuration = 10; //secs
    this.gameTimerCountdown = 10; //secs
    this.gameTimer = new Phaser.Time.TimerEvent({
      delay: this.gameTimerDuration * 1000,
    });
  }

  preload() {
    this.load.image(`bg`, bg);
    this.load.image(`chat-time-text`, chatTimeText);

    this.load.image(`chat-top`, chatTop);
    this.load.image(`chat-bottom`, chatBottom);
  }

  async create(data) {
    const { width, height } = this.scale;

    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 0;

    this.selectionCounter = 0;

    this.add.image(this.screenCenterX, this.screenCenterY, "bg").setOrigin(0.5);

    this.clockBg = this.add.sprite(
      this.screenCenterX,
      this.screenCenterY,
      "clock-bg"
    );
    this.clockText = this.add
      .text(this.clockBg.x, this.clockBg.y, "00:00", {
        font: "18px Arial",
        fill: "#85F560",
        align: "center",
      })
      .setOrigin(0.5)
      .setAngle(-90);

    this.text1 = this.add
      .sprite(this.screenWidth, 0, "chat-time-text")
      .setOrigin(0, 0.5)
      .setAngle(180);
    this.text1.y = this.clockBg.y;

    this.text2 = this.add.sprite(0, 0, "chat-time-text").setOrigin(0, 0.5);
    this.text2.y = this.clockBg.y;

    this.createChatBubbles();

    this.startGameTimer();
  }

  createChatBubbles() {
    this.add.image(this.screenCenterX, 0, "chat-top").setOrigin(0.5, 0);
    this.add
      .image(this.screenCenterX, this.screenHeight, "chat-bottom")
      .setOrigin(0.5, 1);
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

  //use this to start the game time
  startGameTimer() {
    this.time.addEvent(this.gameTimer);
  }

  //use the to pause the game timer
  pauseGameTimer() {
    this.gameTimer.paused = true;
  }

  //use this to resume the game timer
  resumeGameTimer() {
    this.gameTimer.paused = false;
  }

  //use this to reset the game timer
  resetGameTimer() {
    this.time.addEvent(this.gameTimer);
  }

  update() {
    //update timer
    let progress = this.gameTimer.getProgress() * this.gameTimerDuration;
    let absProgress = this.gameTimerCountdown - parseInt(progress.toFixed(0));
    let strProgress =
      absProgress < 10 ? `0${absProgress}:00` : `${absProgress}:00`;
    this.clockText.setText(strProgress);
    if (absProgress >= this.gameTimerDuration) {
      //if from game resume to game
      //else show how to play
      this.startNextScene();
      //this.resetGameTimer();
    }
  }

  startNextScene() {
    this.scene.start("HowToPlayScene", {
      server: {},
      onGameOver: {},
    });
  }
}
