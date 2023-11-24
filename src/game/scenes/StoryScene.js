import { Scene } from "phaser";

import chatBubbleElder from "../../assets/img/story/bubbles/chat-bubble-elder.png";
import chatBubbleKids from "../../assets/img/story/bubbles/chat-bubble-kids.png";

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

    this.load.image("chat-bubble-elder", chatBubbleElder);
    this.load.image("chat-bubble-kids", chatBubbleKids);
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

    this.letsGoButton.on("pointerover", () => {
      this.letsGoButton.setFrame(1);
    });

    this.letsGoButton.on("pointerout", () => {
      this.letsGoButton.setFrame(0);
    });

    this.letsGoButton.on("pointerup", () => {
      this.soundButtonClick.play();
      this.letsGoButton.setFrame(1);
      this.startNextScene();
    });

    this.loadAudioSounds();

    this.createCharacters();

    this.createChatBubbles();

    this.createNavigationButtons();

    this.createNextButton();
  }

  update() {
    if (this.isAnySoundPlaying()) {
      this.nextButton.setVisible(false);
    } else if (this.letsGoButton.visible === true) {
      this.nextButton.setVisible(false);
    } else {
      this.nextButton.setVisible(true);
    }
  }

  loadAudioSounds() {
    this.chatSounds = [
      this.sound.add("introChat1Audio"),
      this.sound.add("introChat2Audio"),
      this.sound.add("introChat3Audio"),
      this.sound.add("introChat4Audio"),
      this.sound.add("introChat5Audio"),
      this.sound.add("introChat6Audio"),
      this.sound.add("introChat7Audio"),
      this.sound.add("introChat8Audio"),
      this.sound.add("introChat9Audio"),
    ];
  }

  createNextButton() {
    this.nextButton = this.add
      .sprite(this.screenCenterX, 617, "next-btn")
      .setFrame(0)
      .setScale(0.8);
    this.nextButton.setInteractive();

    this.nextButton.on("pointerover", () => {
      this.nextButton.setFrame(1);
    });

    this.nextButton.on("pointerout", () => {
      this.nextButton.setFrame(0);
    });

    this.nextButton.on("pointerup", () => {
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
        this.chatSounds[0].play();
        this.kidsBubble.setVisible(true);
        this.chat1.setVisible(true);
        break;
      case 1:
        this.chatSounds[1].play();
        this.kidsBubble.setVisible(true);
        this.chat2.setVisible(true);
        break;
      case 2:
        this.chatSounds[2].play();
        this.elderBubble.setVisible(true);
        this.chat2_2.setVisible(true);
        break;
      case 3:
        this.chatSounds[3].play();
        this.elderBubble.setVisible(true);
        this.chat3.setVisible(true);
        break;
      case 4:
        this.chatSounds[4].play();
        this.elderBubble.setVisible(true);
        this.chat4.setVisible(true);
        break;
      case 5:
        this.chatSounds[5].play();
        this.elderBubble.setVisible(true);
        this.chat5.setVisible(true);
        break;
      case 6:
        this.chatSounds[6].play();
        this.elderBubble.setVisible(true);
        this.chat6.setVisible(true);
        break;
      case 7:
        this.chatSounds[7].play();
        this.kidsBubble.setVisible(true);
        this.chat7.setVisible(true);
        break;
      case 8:
        this.chatCounter = 0;
        this.chatSounds[8].play();
        this.kidsBubble.setVisible(true);
        this.chat8.setVisible(true);
        this.nextButton.setVisible(false);
        this.letsGoButton.setVisible(true);
        break;
      default:
        //Do Nothing
        break;
    }
  }

  isAnySoundPlaying() {
    return this.chatSounds.some(function(sound) {
      return sound.isPlaying;
    });
  }

  stopAnyChatSoundPlaying() {
    this.chatSounds.forEach((sound) => {
      sound.stop();
    });
  }

  hideAllChats() {
    this.elderBubble.setVisible(false);
    this.kidsBubble.setVisible(false);
    this.chat1.setVisible(false);
    this.chat2.setVisible(false);
    this.chat2_2.setVisible(false);
    this.chat3.setVisible(false);
    this.chat4.setVisible(false);
    this.chat5.setVisible(false);
    this.chat6.setVisible(false);
    this.chat7.setVisible(false);
    this.chat8.setVisible(false);
  }

  createNavigationButtons() {
    this.backBtn = this.add.sprite(50, 50, "navigation-btn").setFrame(0);
    this.backBtn.setInteractive();

    this.backBtn.on("pointerdown", (pointer) => {
      this.stopAnyChatSoundPlaying();
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
      this.stopAnyChatSoundPlaying();
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
    this.elderBubble = this.add
      .image(
        this.elder.x + this.elder.width + 50,
        this.elder.y - this.elder.height / 2 + 100,
        "chat-bubble-elder"
      )
      .setRotation(0.01)
      .setScale(1.15);
    this.elderBubble.setVisible(false);

    this.kidsBubble = this.add
      .image(
        this.screenWidth - 410,
        this.kids.y - this.kids.height / 2 - 50,
        "chat-bubble-kids"
      )
      .setRotation(-0.025)
      .setScale(1.05);
    this.kidsBubble.setVisible(false);

    // ********************************* //

    this.chat1 = this.createText(
      this.kidsBubble.x + 10,
      this.kidsBubble.y - this.kidsBubble.height / 2 + 70,
      this.kidsBubble.width,
      this.kidsBubble.height,
      "DAVID",
      "Shikamoo Nyanya",
      45,
      1
    );
    this.chat1.setVisible(false);

    // ********************************* //

    this.chat2 = this.createText(
      this.kidsBubble.x + 10,
      this.kidsBubble.y - this.kidsBubble.height / 2 + 70,
      this.kidsBubble.width,
      this.kidsBubble.height,
      "Kezia",
      "How are you today?",
      45,
      1
    );
    this.chat2.setVisible(false);

    // ********************************* //

    this.chat2_2 = this.createText(
      this.elderBubble.x + 10,
      this.elderBubble.y - this.elderBubble.height / 2 + 30,
      this.elderBubble.width,
      this.elderBubble.height,
      "Kezia",
      "Marahaba wanangu!",
      65,
      1
    );
    this.chat2_2.setVisible(false);

    // ********************************* //

    this.chat3 = this.createText(
      this.elderBubble.x,
      this.elderBubble.y - this.elderBubble.height / 2,
      this.elderBubble.width,
      this.elderBubble.height,
      "ELDER",
      "I am very sad today, as you can see the river is\nvery polluted from the city and it's not what it\nused to be",
      43,
      1
    );
    this.chat3.setVisible(false);

    // ********************************* //

    this.chat4 = this.createText(
      this.elderBubble.x,
      this.elderBubble.y - this.elderBubble.height / 2,
      this.elderBubble.width,
      this.elderBubble.height,
      "ELDER",
      "When I was your age... I used to come here almost\neveryday to swim with my friends and\nsometimes...",
      43,
      1
    );
    this.chat4.setVisible(false);

    // ********************************* //

    this.chat5 = this.createText(
      this.elderBubble.x,
      this.elderBubble.y - this.elderBubble.height / 2 + 30,
      this.elderBubble.width,
      this.elderBubble.height,
      "ELDER",
      "We would even find some fish!",
      50,
      1
    );
    this.chat5.setVisible(false);

    // ********************************* //

    this.chat6 = this.createText(
      this.elderBubble.x,
      this.elderBubble.y - this.elderBubble.height / 2 + 10,
      this.elderBubble.width,
      this.elderBubble.height,
      "ELDER",
      "I don't know how we can save it from\nbeing polluted further",
      50,
      1
    );
    this.chat6.setVisible(false);

    // ********************************* //

    this.chat7 = this.createText(
      this.kidsBubble.x + 10,
      this.kidsBubble.y - this.kidsBubble.height / 2 + 60,
      this.kidsBubble.width,
      this.kidsBubble.height,
      "Kezia",
      "Don't worry! We are going to help,\nsave and clean the river!",
      43,
      1
    );
    this.chat7.setVisible(false);

    // ********************************* //

    this.chat8 = this.createText(
      this.kidsBubble.x + 10,
      this.kidsBubble.y - this.kidsBubble.height / 2 + 70,
      this.kidsBubble.width,
      this.kidsBubble.height,
      "DAVID",
      "Let's go",
      50,
      1
    );
    this.chat8.setVisible(false);
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
