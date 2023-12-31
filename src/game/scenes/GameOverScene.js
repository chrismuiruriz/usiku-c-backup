import { Scene } from "phaser";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create(data) {
    let styleConfig = {
      color: "#3677f9",
      fontSize: "2rem",
      fontFamily: "'Bubblegum Sans', cursive",
    };

    const text = data.winner ? "You Won" : "You Lost!";

    const { width, height } = this.scale;

    const title = this.add
      .text(width * 0.5, height * 0.5, text, styleConfig)
      .setOrigin(0.5);

    this.add
      .text(title.x, title.y + 100, "Press space to play again")
      .setOrigin(0.5);

    store.dispatch("game/setGameOver", {
      isGameOver: true,
    });

    this.input.keyboard.once("keyup-SPACE", () => {
      if (data.onRestart) {
        data.onRestart();
      }
    });
  }
}
