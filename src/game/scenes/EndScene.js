import { Scene } from "phaser";

import endElder from "../../assets/img/end/elder.png";
import endKids from "../../assets/img/end/kids.png";
import endBg from "../../assets/img/end/bg.png";
import chatBubble from "../../assets/img/end/chat-bubble.png";

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
    this.load.image("chat-bubble", chatBubble);
  }

  async create(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 1;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "end-bg")
      .setOrigin(0.5);

    this.loadAudioSounds();

    this.createChatBubbles();

    this.createCharacters();

    this.createNextButton();

    this.chatSounds[0].play();
    this.elderChatBubble.setVisible(true);
    this.chat1.setVisible(true);
  }

  createCharacters() {
    let elder = this.add.image(0, 0, "end-elder").setOrigin(0.5);
    elder.x = this.screenWidth - elder.width / 2;
    elder.y = this.screenHeight - elder.height / 2;

    let characters = this.add.image(0, 0, "end-kids");
    characters.x = characters.width / 2;
    characters.y = this.screenHeight - characters.height / 2;
  }

  createNextButton() {
    this.soundButtonClick = this.sound.add("s-button-click");

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
    this.stopAnyChatSoundPlaying();
    switch (this.chatCounter) {
      case 1:
        this.chatSounds[1].play();
        this.kidsChatBubble.setVisible(true);
        this.chat2.setVisible(true);
        break;
      case 2:
        this.chatSounds[2].play();
        this.kidsChatBubble.setVisible(true);
        this.chat3.setVisible(true);
        break;
      case 3:
        this.startNextScene();
        break;
    }
  }

  loadAudioSounds() {
    this.chatSounds = [
      this.sound.add("outroChat1Audio"),
      this.sound.add("outroChat2Audio"),
      this.sound.add("outroChat3Audio"),
    ];
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
    this.elderChatBubble.setVisible(false);
    this.kidsChatBubble.setVisible(false);

    this.chat1.setVisible(false);
    this.chat2.setVisible(false);
    this.chat3.setVisible(false);
  }

  createChatBubbles() {
    this.elderChatBubble = this.add
      .image(this.screenCenterX + 50, this.screenCenterY - 160, "chat-bubble")
      .setOrigin(0, 1)
      .setVisible(false);

    this.kidsChatBubble = this.add
      .image(
        this.screenCenterX - this.screenWidth / 2 - 100,
        this.screenCenterY - 170,
        "chat-bubble"
      )
      .setOrigin(0, 1)
      .setVisible(false);

    // ********************************* //

    this.chat1 = this.add.bitmapText(
      this.elderChatBubble.x + 53,
      this.elderChatBubble.y - this.elderChatBubble.height / 2 - 47,
      "natural-log",
      "Congratulations, I'm so proud of you.\nYou have helped clean the river.",
      36,
      1
    );
    this.chat1.setVisible(false);

    // ********************************* //

    this.chat2 = this.add.bitmapText(
      this.kidsChatBubble.x + this.kidsChatBubble.width / 2 - 50,
      this.kidsChatBubble.y - this.kidsChatBubble.height / 2 - 50,
      "natural-log",
      "We did it!",
      50,
      1
    );
    this.chat2.setVisible(false);

    // ********************************* //

    this.chat3 = this.add.bitmapText(
      this.kidsChatBubble.x + 140,
      this.kidsChatBubble.y - this.kidsChatBubble.height / 2 - 40,
      "natural-log",
      "Team works makes the dream work.",
      40,
      1
    );
    this.chat3.setVisible(false);
  }

  startNextScene() {
    this.scene.stop("EndScene");
    this.scene.start("LoadingScene", {
      server: {},
      onGameOver: {},
    });
  }
}
