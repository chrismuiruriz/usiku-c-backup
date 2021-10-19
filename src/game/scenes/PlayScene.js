import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });

    this.cells = [];
    this.gameStateText = undefined;
    this.gameStateTextID = undefined;
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
    const cellSize = 95;

    let x = width * 0.5 - cellSize;
    let y = height * 0.5 - cellSize;
    state.board.forEach((cellState, idx) => {
      console.log(`Index = ${idx} X = ${x}`);
      let internalCellWidth = cellSize;
      if (idx === 1 || idx === 4 || idx === 7) {
        internalCellWidth = internalCellWidth - 2;
      }

      const cell = this.add
        .rectangle(x, y, internalCellWidth, cellSize, 0x3677f9)
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

      x += cellSize;

      if ((idx + 1) % 3 === 0) {
        y += cellSize + 2;
        x = width * 0.5 - cellSize;
      }
    });

    if (this.server?.gameState === 0) {
      const width = this.scale.width;

      let styleConfig = {
        color: "#3677f9",
        fontSize: "1.3rem",
        fontFamily: "'Bubblegum Sans', cursive",
      };

      let styleConfig2 = {
        color: "#f87235",
        fontSize: "1.5rem",
        fontFamily: "'Bubblegum Sans', cursive",
      };
      this.gameStateText = this.add
        .text(width * 0.5, 15, "Waiting for opponent player 2", styleConfig)
        .setOrigin(0.5);

      let gamePassId = store.getters["game/getGameRoomDisplayId"];

      this.gameStateTextID = this.add
        .text(
          width * 0.5,
          this.gameStateText.y + this.gameStateText.height + 10,
          `${gamePassId}`,
          styleConfig2
        )
        .setOrigin(0.5);

      window.GLOBAL_TEXT = this.gameStateText;
      window.GLOBAL_TEXT_2 = this.gameStateText;
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
            .star(cell.display.x, cell.display.y, 4, 4, 40, 0xf87235)
            .setAngle(45);
          break;
        case 2:
          this.add.circle(cell.display.x, cell.display.y, 30, 0xf87235);
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
      this.gameStateText.destroy();
      this.gameStateText = undefined;

      this.gameStateTextID.destroy();
      this.gameStateTextID = undefined;
    }
  }
}
