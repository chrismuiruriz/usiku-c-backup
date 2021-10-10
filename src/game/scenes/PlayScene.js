import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });

    this.cells = [];
  }

  async create(data) {
    const { server } = data;

    this.server = server;

    if (!this.server) {
      throw new Error("Server instance missing..");
    }

    await this.server.join();

    this.server.onceStateChanged(this.createBoard, this);

    this.sound.add("thud");

    //let's see if we can listen for vue store events
    store.watch(
      (state) => state.game.isPaused,
      (newValue, oldValue) => {
        if (newValue) {
          this.scene.pause("PlayScene");
        } else {
          this.scene.resume("PlayScene");
        }
      }
    );

    store.subscribe((mutation, state) => {
      console.log(`Mutation detected`, mutation);
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

    this.server?.onBoardChanged(this.handleBoardChanged, this);
    this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this);
  }

  handleBoardChanged(board) {
    for (let i = 0; i < board.length; i++) {
      const cell = this.cells[i];
      const newValue = board[i];
      if (cell.value !== newValue) {
        //this.sound.play("thud", { volume: 0.5 });
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
  }

  handlePlayerTurnChanged(playerIndex) {
    console.log("Player index is: ", playerIndex);
  }
}
