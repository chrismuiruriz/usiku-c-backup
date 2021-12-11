import { Scene } from "phaser";
import store from "../../store";

import chat1 from "../../assets/img/story/chats/1-david.png";
import chat2 from "../../assets/img/story/chats/2-kezia.png";
import chat3 from "../../assets/img/story/chats/3-elder.png";
import chat4 from "../../assets/img/story/chats/4-elder.png";
import chat5 from "../../assets/img/story/chats/5-elder.png";
import chat6 from "../../assets/img/story/chats/6-elder.png";
import chat7 from "../../assets/img/story/chats/7-elder.png";

export default class StoryScene extends Scene {
  constructor() {
    super({
      key: "StoryScene",
    });
  }

  preload() {
    this.load.image(`chat_1`, chat1);
    this.load.image(`chat_2`, chat2);
    this.load.image(`chat_3`, chat3);
    this.load.image(`chat_4`, chat4);
    this.load.image(`chat_5`, chat5);
    this.load.image(`chat_6`, chat6);
    this.load.image(`chat_7`, chat7);
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

    this.add
      .image(this.screenCenterX, this.screenCenterY, "story-scene-bg")
      .setOrigin(0.5);

    this.startButton = this.add
      .sprite(this.screenCenterX, 617, "continue-btn")
      .setFrame(0)
      .setScale(0.8);
    this.startButton.setInteractive();
    this.startButton.setVisible(false);

    this.startButton.on("pointerover", (pointer) => {
      this.startButton.setFrame(1);
    });

    this.startButton.on("pointerout", (pointer) => {
      this.startButton.setFrame(0);
    });

    this.startButton.on("pointerup", (pointer) => {
      this.startButton.setFrame(1);
      this.startNextScene();
    });

    this.createCharacters();

    this.createChatBubbles();

    this.createNavigationButtons();

    this.input.on(
      "pointerdown",
      () => {
        this.displayChats();
        this.chatCounter++;
      },
      this
    );
  }

  displayChats() {
    this.hideAllChats();
    switch (this.chatCounter) {
      case 0:
        this.chat1.setVisible(true);
        break;
      case 1:
        this.chat2.setVisible(true);
        break;
      case 2:
        this.chat3.setVisible(true);
        break;
      case 3:
        this.chat4.setVisible(true);
        break;
      case 4:
        this.chat5.setVisible(true);
        break;
      case 5:
        this.chat6.setVisible(true);
        break;
      case 6:
        this.chat7.setVisible(true);
        break;
      case 7:
        this.startButton.setVisible(true);
        break;
      default:
        //Do Nothing
        break;
    }
  }

  hideAllChats() {
    this.chat1.setVisible(false);
    this.chat2.setVisible(false);
    this.chat3.setVisible(false);
    this.chat4.setVisible(false);
    this.chat5.setVisible(false);
    this.chat6.setVisible(false);
    this.chat7.setVisible(false);
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

  createCharacters() {
    this.elder = this.add.sprite(0, 0, "story-elder");

    this.elder.x = this.elder.width / 2;
    this.elder.y = this.screenHeight - this.elder.height / 2 + 50;

    this.kids = this.add.sprite(0, 0, "story-kids");
    this.kids.x = this.screenWidth - this.kids.width / 2;
    this.kids.y = this.screenHeight - this.kids.height / 2;
  }

  createChatBubbles() {
    this.chat1 = this.add
      .image(
        this.kids.x - 100,
        this.kids.y - this.kids.height / 2 - 60,
        "chat_1"
      )
      .setVisible(false);

    this.chat2 = this.add
      .image(
        this.kids.x + 50,
        this.kids.y - this.kids.height / 2 - 60,
        "chat_2"
      )
      .setVisible(false);

    this.chat3 = this.add
      .image(
        this.elder.x + 150,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_3"
      )
      .setVisible(false);

    this.chat4 = this.add
      .image(
        this.elder.x + 200,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_4"
      )
      .setVisible(false);

    this.chat5 = this.add
      .image(
        this.elder.x + 200,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_5"
      )
      .setVisible(false);

    this.chat6 = this.add
      .image(
        this.elder.x + 200,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_6"
      )
      .setVisible(false);

    this.chat7 = this.add
      .image(
        this.elder.x + 200,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_7"
      )
      .setVisible(false);
  }

  startNextScene() {
    this.scene.start("GameSetupScene", {
      server: {},
      onGameOver: {},
    });
  }
}
