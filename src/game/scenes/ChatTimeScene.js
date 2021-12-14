import { Scene } from "phaser";

import chatTimeBg from "../../assets/img/chat-time/chat-time-bg.png";
import chatTimeText from "../../assets/img/chat-time/chat-time.png";

import chatTop from "../../assets/img/take-position/chat-top.png";
import chatBottom from "../../assets/img/take-position/chat-bottom.png";

import GameState from "../data/GameState";

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
    this.load.image(`chat-time-bg`, chatTimeBg);
    this.load.image(`chat-time-text`, chatTimeText);

    this.load.image(`chat-top`, chatTop);
    this.load.image(`chat-bottom`, chatBottom);
  }

  async create(data) {
    const { preScene } = data;

    this.previousScene = preScene;

    this.gameState = new GameState();

    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 0;

    this.selectionCounter = 0;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "chat-time-bg")
      .setOrigin(0.5);

    this.clockBg = this.add.sprite(
      this.screenCenterX,
      this.screenCenterY,
      "clock-bg"
    );

    this.clockText = this.add
      .bitmapText(
        this.clockBg.x,
        this.clockBg.y,
        "segments-basic",
        "00:00",
        20,
        Phaser.Display.Align.CENTER
      )
      .setOrigin(0.5)
      .setAngle(-90);

    this.text1 = this.add
      .sprite(this.screenWidth, 0, "chat-time-text")
      .setOrigin(0, 0.5)
      .setAngle(180);
    this.text1.y = this.clockBg.y;

    this.text2 = this.add.sprite(0, 0, "chat-time-text").setOrigin(0, 0.5);
    this.text2.y = this.clockBg.y;

    let bPlaceholder = this.add
      .image(0, 0, "chat-time-bubble")
      .setVisible(false);
    let bXGap = 100;
    let bYGap = 50;

    //TL
    this.createChatBubbles(bXGap, bPlaceholder.height + bYGap, 180, 3);

    //TR
    this.createChatBubbles(
      this.screenWidth - bPlaceholder.width - bXGap,
      bPlaceholder.height + bYGap,
      180,
      2
    );

    //BR
    this.createChatBubbles(
      this.screenWidth - bPlaceholder.width - bXGap,
      this.screenHeight - bYGap,
      0,
      1
    );

    //BL
    this.createChatBubbles(bXGap, this.screenHeight - bYGap, 0, 0);

    this.startGameTimer();
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
        "Each player should sit facing their\ncorner of the tablet",
        20,
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
    if (absProgress <= 0) {
      if (this.previousScene === "TakePositionScene") {
        this.startNextScene();
      } else {
        this.startNextRound();
      }
    }
  }

  startNextRound() {
    //times up
    //let's check if we have other rounds to play
    //if players have played all rounds, show game summary scene else, show change positions

    if (this.gameState.getCurrentRound() >= 4) {
      this.scene.stop("ChatTimeScene");
      this.scene.start("GameSummaryScene", {
        server: {},
        onGameOver: {},
      });
    } else {
      let nextRound = this.gameState.getCurrentRound() + 1;
      this.gameState.setCurrentRound(nextRound);

      this.scene.stop("ChatTimeScene");
      this.scene.start("ChangePositionsScene", {
        server: {},
        onGameOver: {},
      });
    }
  }

  startNextScene() {
    this.scene.stop("ChatTimeScene");
    this.scene.start("HowToPlayScene", {
      server: {},
      onGameOver: {},
    });
  }
}
