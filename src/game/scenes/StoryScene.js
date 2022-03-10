import { Scene } from "phaser";

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

    this.soundButtonClick = this.sound.add("s-button-click");

    this.letsGoButton = this.add
      .sprite(this.screenCenterX, 617, "letsgo-btn")
      .setFrame(0)
      .setScale(0.8);
    this.letsGoButton.setInteractive();
    this.letsGoButton.setVisible(false);

    this.letsGoButton.on("pointerover", (pointer) => {
      this.letsGoButton.setFrame(1);
    });

    this.letsGoButton.on("pointerout", (pointer) => {
      this.letsGoButton.setFrame(0);
    });

    this.letsGoButton.on("pointerup", (pointer) => {
      this.soundButtonClick.play();
      this.letsGoButton.setFrame(1);
      this.startNextScene();
    });

    this.createCharacters();

    this.createChatBubbles();

    this.createNavigationButtons();

    this.createNextButton();
  }

  createNextButton() {
    this.nextButton = this.add
      .sprite(this.screenCenterX, 617, "next-btn")
      .setFrame(0)
      .setScale(0.8);
    this.nextButton.setInteractive();

    this.nextButton.on("pointerover", (pointer) => {
      this.nextButton.setFrame(1);
    });

    this.nextButton.on("pointerout", (pointer) => {
      this.nextButton.setFrame(0);
    });

    this.nextButton.on("pointerup", (pointer) => {
      this.soundButtonClick.play();
      this.nextButton.setFrame(1);
      this.displayChats();
      this.chatCounter++;
    });
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
        this.chat2_2.setVisible(true);
        break;
      case 3:
        this.chat3.setVisible(true);
        break;
      case 4:
        this.chat4.setVisible(true);
        break;
      case 5:
        this.chat5.setVisible(true);
        break;
      case 6:
        this.chat6.setVisible(true);
        break;
      case 7:
        this.chat7.setVisible(true);
        break;
      case 8:
        this.chatCounter = 0;
        this.nextButton.setVisible(false);
        this.letsGoButton.setVisible(true);
        break;
      default:
        //Do Nothing
        break;
    }
  }

  hideAllChats() {
    this.chat1.setVisible(false);
    this.chat2.setVisible(false);
    this.chat2_2.setVisible(false);
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
      this.soundButtonClick.play();
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
      this.soundButtonClick.play();
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
    this.chat1 = this.add.group();
    this.bubble1 = this.add.image(
      this.kids.x - 100,
      this.kids.y - this.kids.height / 2 - 60,
      "chat_1"
    );
    this.chat1Text = this.createText(
      this.bubble1.x + 10,
      this.bubble1.y - 20,
      this.bubble1.width,
      this.bubble1.height,
      "DAVID",
      "Shikamoo",
      30,
      1
    );

    this.chat1Char = this.createCharText(
      this.bubble1.x + 10,
      this.bubble1.y - 20,
      this.bubble1.width,
      this.bubble1.height,
      "David",
      1
    );

    this.chat1.add(this.bubble1);
    this.chat1.add(this.chat1Text);
    this.chat1.add(this.chat1Char);
    this.chat1.setVisible(false);

    // ********************************* //

    this.chat2 = this.add.group();
    this.bubble2 = this.add
      .image(
        this.kids.x + 50,
        this.kids.y - this.kids.height / 2 - 60,
        "chat_2"
      )
      .setScale(1.2)
      .setVisible(true);
    this.chat2Text = this.createText(
      this.bubble2.x + 5,
      this.bubble2.y - 25,
      this.bubble2.width,
      this.bubble2.height,
      "Kezia",
      "What are you doing\ntoday?",
      30,
      1
    );

    this.chat2Char = this.createCharText(
      this.bubble2.x + 10,
      this.bubble2.y - 20,
      this.bubble2.width,
      this.bubble2.height,
      "Kezia",
      1
    );

    this.chat2.add(this.bubble2);
    this.chat2.add(this.chat2Text);
    this.chat2.add(this.chat2Char);
    this.chat2.setVisible(false);

    // ********************************* //

    this.chat2_2 = this.add.group();
    this.bubble2_2 = this.add.image(
      this.elder.x + 200,
      this.elder.y - this.elder.height / 2 + 50,
      "chat_3"
    );

    this.chat2_2Text = this.createText(
      this.bubble2_2.x + 10,
      this.bubble2_2.y - 20,
      this.bubble2_2.width,
      this.bubble2_2.height,
      "ELDER",
      "Marahaba!",
      30,
      1
    );

    this.chat2_2Char = this.createCharText(
      this.bubble2_2.x + 10,
      this.bubble2_2.y - 10,
      this.bubble2_2.width,
      this.bubble2_2.height,
      "Elder",
      1
    );

    this.chat2_2.add(this.bubble2_2);
    this.chat2_2.add(this.chat2_2Text);
    this.chat2_2.add(this.chat2_2Char);
    this.chat2_2.setVisible(false);

    // ********************************* //

    this.chat3 = this.add.group();
    this.bubble3 = this.add
      .image(
        this.elder.x + 250,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_3"
      )
      .setScale(2.2);
    this.chat3Text = this.createText(
      this.bubble3.x + 10,
      this.bubble3.y - 45,
      this.bubble3.width,
      this.bubble3.height,
      "ELDER",
      "I am very sad today, as you can see the river is\nvery polluted from the city and\nit's not what it used to be",
      30,
      1
    );

    this.chat3Char = this.createCharText(
      this.bubble3.x + 140,
      this.bubble3.y - 50,
      this.bubble3.width,
      this.bubble3.height,
      "Elder",
      1
    );

    this.chat3.add(this.bubble3);
    this.chat3.add(this.chat3Text);
    this.chat3.add(this.chat3Char);
    this.chat3.setVisible(false);

    // ********************************* //

    this.chat4 = this.add.group();
    this.bubble4 = this.add
      .image(
        this.elder.x + 300,
        this.elder.y - this.elder.height / 2 + 100,
        "chat_4"
      )
      .setScale(1.4);

    this.chat4Text = this.createText(
      this.bubble4.x + 10,
      this.bubble4.y - 54,
      this.bubble4.width,
      this.bubble4.height,
      "ELDER",
      "When I was your age... I used to come\nhere almost everyday to swim with my friends\nand sometimes...",
      30,
      1
    );

    this.chat4Char = this.createCharText(
      this.bubble4.x + 75,
      this.bubble4.y - 35,
      this.bubble4.width,
      this.bubble4.height,
      "ELDER",
      1
    );

    this.chat4.add(this.bubble4);
    this.chat4.add(this.chat4Text);
    this.chat4.add(this.chat4Char);
    this.chat4.setVisible(false);

    // ********************************* //

    this.chat5 = this.add.group();
    this.bubble5 = this.add.image(
      this.elder.x + 200,
      this.elder.y - this.elder.height / 2 + 50,
      "chat_5"
    );

    this.chat5Text = this.createText(
      this.bubble5.x + 10,
      this.bubble5.y - 30,
      this.bubble5.width,
      this.bubble5.height,
      "ELDER",
      "We would even find some fish!",
      30,
      1
    );

    this.chat5Char = this.createCharText(
      this.bubble5.x + 10,
      this.bubble5.y - 10,
      this.bubble5.width,
      this.bubble5.height,
      "Elder",
      1
    );

    this.chat5.add(this.bubble5);
    this.chat5.add(this.chat5Text);
    this.chat5.add(this.chat5Char);
    this.chat5.setVisible(false);

    // ********************************* //

    this.chat6 = this.add.group();
    this.bubble6 = this.add
      .image(
        this.elder.x + 210,
        this.elder.y - this.elder.height / 2 + 50,
        "chat_6"
      )
      .setScale(1.4);
    this.chat6Text = this.createText(
      this.bubble6.x + 10,
      this.bubble6.y - 31,
      this.bubble6.width,
      this.bubble6.height,
      "ELDER",
      "I don't know how we can save it from\nbeing polluted further",
      30,
      1
    );

    this.chat6Char = this.createCharText(
      this.bubble6.x + 70,
      this.bubble6.y - 30,
      this.bubble6.width,
      this.bubble6.height,
      "Elder",
      1
    );

    this.chat6.add(this.bubble6);
    this.chat6.add(this.chat6Text);
    this.chat6.add(this.chat6Char);
    this.chat6.setVisible(false);

    // ********************************* //

    this.chat7 = this.add.group();
    this.bubble7 = this.add.image(
      this.kids.x + this.kids.width / 2 - 220,
      this.kids.y - this.kids.height / 2 - 90,
      "chat_7"
    );
    this.chat7Text = this.createText(
      this.bubble7.x + 10,
      this.bubble7.y - 42,
      this.bubble7.width,
      this.bubble7.height,
      "DAVID & KEZIA",
      "Don't worry! We are going to\nhelp save and clean the river!",
      30,
      1
    );

    this.chat7Char = this.createCharText(
      this.bubble7.x + 5,
      this.bubble7.y - 15,
      this.bubble7.width,
      this.bubble7.height,
      "David & Kezia",
      1
    );

    this.chat7.add(this.bubble7);
    this.chat7.add(this.chat7Text);
    this.chat7.add(this.chat7Char);
    this.chat7.setVisible(false);
  }

  createText(x, y, w, h, name, text, size, align) {
    let t = new Phaser.GameObjects.BitmapText(
      this,
      x,
      y,
      "natural-log",
      text,
      size,
      align
    );
    t.x = x - t.width / 2;

    this.add.existing(t);
    return t;
  }

  createCharText(x, y, w, h, text, align) {
    let char = new Phaser.GameObjects.BitmapText(
      this,
      0,
      0,
      "natural-log",
      text,
      20,
      align
    );
    char.x = x + w / 2 - char.width - 20;
    char.y = y - h / 2 + char.height / 2 + 20;

    this.add.existing(char);
    return char;
  }

  startNextScene() {
    this.scene.start("GameSetupScene", {
      server: {},
      onGameOver: {},
    });
    this.scene.stop("StoryScene");
  }
}
