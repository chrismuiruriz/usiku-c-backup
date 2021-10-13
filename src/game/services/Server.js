import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import store from "../../store";

export default class Server {
  playerIndex = -1;

  constructor() {
    this.client = new Client("ws://localhost:2567");
    this.events = new Phaser.Events.EventEmitter();
  }

  get playerIndex() {
    return this.playerIndex;
  }

  get gameState() {
    if (!this.room) {
      return 0;
    }

    return this.room?.state.gameState;
  }

  async join() {
    let gameMode = store.getters["game/getPlayerGameMode"];
    let gameRoomId = store.getters["game/getGameRoomId"];
    console.log("Joined called");

    //if game is initialized &&
    if (gameMode) {
      if (gameMode === "HOST") {
        this.setupGame(gameMode, gameRoomId);
      } else {
        await store.dispatch("game/startGame", {
          player_game_mode: null,
          game_room_id: null,
        });
        //this.setUpListeners();
      }
    } else {
      //listen for game start event from store
      this.setUpListeners();
    }
  }

  setUpListeners() {
    store.watch(
      (state) => state.game.playerGameMode,
      (newValue, oldValue) => {
        console.log(`GameMode event triggered`, newValue);
        let gamePassId = store.getters["game/getGameRoomId"];
        if (gamePassId) {
          this.setupGame(newValue, gamePassId);
        }
      }
    );
  }

  async setupGame(playerGameMode, gamePassId) {
    //joins an existing room or creates a room if it does not exist
    if (playerGameMode === "HOST") {
      this.room = await this.client.joinOrCreate("tmi");
    } else if (playerGameMode === "GUEST") {
      this.room = await this.client.joinById(gamePassId);
    } else {
      return;
    }
    console.log("Game Room", this.room);

    this.room.onMessage("playerIndex", (message) => {
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
          case "winningPlayer":
            this.events.emit("player-won", value);
            break;
          case "gameState":
            this.events.emit("game-state-changed", value);
            break;
        }
      });
    };

    this.room.state.board.onChange = (item, idx) => {
      this.events.emit("board-changed", item, idx);
    };
  }

  leave() {
    this.room?.leave();
    this.events.removeAllListeners();
  }

  makeSelection(idx) {
    if (!this.room) {
      return;
    }

    if (this.room.state.gameState !== 1) {
      return;
    }

    if (this.playerIndex !== this.room.state.activePlayer) {
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

  onPlayerWon(cb, context) {
    this.events.on("player-won", cb, context);
  }

  onGameStateChanged(cb, context) {
    this.events.on("game-state-changed", cb, context);
  }
}
