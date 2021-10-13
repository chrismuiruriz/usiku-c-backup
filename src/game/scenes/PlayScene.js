import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });

    this.cells = [];
    this.gameStateText = undefined;
  }

  init() {
    this.cells = [];
  }

  async create(data) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

    if (!this.server) {
      throw new Error("Server instance missing..");
    }

    await this.server.join();

    this.server.onceStateChanged(this.createBoard, this);

    this.sound.add("thud");

    //let's see if we can listen for vue store events
    store.subscribe((mutation, state) => {
      //TODO: Something awesome
    });
  }

  update() {}

  createBoard(state) {
    const { width, height } = this.scale;
    const cellSize = 128;

    let x = width * 0.5 - cellSize;
    let y = height * 0.5 - cellSize;
    state.board.forEach((cellState, idx) => {
      const cell = this.add
        .rectangle(x, y, cellSize, cellSize, 0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.server?.makeSelection(idx);
        });

      //draw initial state
      switch (cellState) {
        case 1:
          this.add.star(cell.x, cell.y, 4, 4, 60, 0xff0000).setAngle(45);
          break;
        case 2:
          this.add.circle(cell.x, cell.y, 50, 0x0000ff);
          break;
      }

      this.cells.push({
        display: cell,
        value: cellState,
      });

      x += cellSize + 5;

      if ((idx + 1) % 3 === 0) {
        y += cellSize + 5;
        x = width * 0.5 - cellSize;
      }
    });

    if (this.server?.gameState === 0) {
      const width = this.scale.width;
      this.gameStateText = this.add
        .text(width * 0.5, 50, "Waiting for opponent...")
        .setOrigin(0.5);
    }

    this.server?.onBoardChanged(this.handleBoardChanged, this);
    this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this);
    this.server?.onPlayerWon(this.handlePlayerWon, this);
    this.server?.onGameStateChanged(this.handleGameStateChanged, this);
  }

  handleBoardChanged(newValue, idx) {
    const cell = this.cells[idx];
    if (cell.value !== newValue) {
      switch (newValue) {
        case 1:
          this.add
            .star(cell.display.x, cell.display.y, 4, 4, 60, 0xff0000)
            .setAngle(45);
          break;
        case 2:
          this.add.circle(cell.display.x, cell.display.y, 50, 0x0000ff);
          break;
      }

      cell.value = newValue;
    }
  }

  handlePlayerTurnChanged(playerIndex) {
    //TODO: Show who's turn is it
  }

  handlePlayerWon(playerIndex) {
    this.time.delayedCall(1000, () => {
      if (!this.onGameOver) {
        return;
      }

      this.onGameOver({
        winner: this.server?.playerIndex === playerIndex,
      });
    });
  }

  handleGameStateChanged(state) {
    if (state === 1 && this.gameStateText) {
      console.log("destroy this.gameStateText");
      this.gameStateText.destroy();
      this.gameStateText = undefined;
    }
  }
}
