import { Client, Room } from "colyseus.js";
import Phaser from "phaser";

export default class Server {
  playerIndex = -1;

  constructor() {
    this.client = new Client("ws://localhost:2567");
    this.events = new Phaser.Events.EventEmitter();
  }

  get playerIndex() {
    return this.playerIndex;
  }

  async join() {
    this.room = await this.client.joinOrCreate("tmi");
    console.log(this.room.state);

    this.room.onMessage("playerIndex", (message) => {
      console.log(`Message from playerIndex`, message);
      this.playerIndex = message.playerIndex;
    });

    this.room.onStateChange.once((state) => {
      this.events.emit("once-state-changed", state);
    });

    //listen for all room changes
    this.room.state.onChange = (changes) => {
      changes.forEach((change) => {
        const { field, value } = change;
        switch (field) {
          case "activePlayer":
            //emit plater turn event
            this.events.emit("player-turn-changed", value);
            break;
        }
      });
    };

    //listen for board changes
    this.room.state.board.onChange = (changes) => {
      this.events.emit("board-changed", this.room?.state.board);
    };

    //listen for activePlayer changes
    // this.room.state.activePlayer.onChange = (changes) => {
    //   console.log(`ActivePlayer change detected!!!`);
    // };
  }

  makeSelection(idx) {
    if (!this.room) {
      return;
    }

    if (this.playerIndex != this.room.state.activePlayer) {
      console.warn(`Not this player's turn!`);
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

  onPlayerTurnChanged(cb, context) {
    this.events.on("player-turn-changed", cb, context);
  }
}
