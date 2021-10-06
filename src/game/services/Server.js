import { Client, Room } from "colyseus.js";
import { Schema } from "@colyseus/schema";
import Phaser from "phaser";

export default class Server {
  constructor() {
    this.client = new Client("ws://localhost:2567");
    this.events = new Phaser.Events.EventEmitter();
  }

  async join() {
    this.room = await this.client.joinOrCreate("tmi");

    this.room.onStateChange.once((state) => {
      this.events.emit("once-state-changed", state);
    });

    this.room.state.board.onChange = (changes) => {
      this.events.emit("board-changed", this.room?.state.board);
    };
  }

  makeSelection(idx) {
    if (!this.room) {
      return;
    }
    this.room.send("TMI", { index: idx });
  }

  onceStateChanged(cb, context) {
    this.events.once("once-state-changed", cb, context);
  }

  onBoardChanged(cb, context) {
    this.events.on("board-changed", cb, context);
  }
}
