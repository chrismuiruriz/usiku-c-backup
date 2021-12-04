import { Scene } from "phaser";
import store from "../../store";

export default class PlayScene extends Scene {
  constructor() {
    super({
      key: "PlayScene",
      physics: {
        arcade: {
          debug: true,
        },
        matter: {
          gravity: {
            x: 0,
            y: 0,
          },
          debug: true,
        },
      },
    });
  }

  init() {
    this.debugDir = "right";
  }

  async create(data) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

    this.sound.add("thud");

    //grid
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const screenCenterX = this.cameras.main.worldView.x + screenWidth / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenHeight / 2;

    //add game background
    this.add.image(screenCenterX, screenCenterY, "game-backround").setOrigin(0.5);

    const grid = this.add
      .grid(
        screenCenterX,
        screenCenterY,
        screenWidth,
        screenHeight,
        64,
        64,
        0xffffff,
        0,
        0xffffff,
        0.5
      )
      .setOrigin(0.5);

    var shapes = {
      rectangle: [
        [
          { x: 35, y: -160 },
          { x: 65, y: -160 },
          { x: 65, y: 80 },
          { x: 35, y: 80 },
        ],
      ],
    };

    //add excavator base
    this.excavatorBase = this.matter.add.sprite(350, 500, "excavator-base");
    this.excavatorBase.setStatic(true);
    this.excavatorBase.setOrigin(0.5, 0.5);

    //add excavator arm
    this.excavatorArm = this.matter.add.sprite(
      this.excavatorBase.x,
      50,
      "excavator-arm",
      null,
      {
        shape: { type: "fromVerts", verts: shapes.rectangle },
        render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
      }
    );
    this.excavatorArm.setStatic(true);
    this.excavatorArm.setOrigin(0.5, 0.75);
    //this.excavatorArm.setAngle(90);
    this.excavatorArm.setFriction(0.005);

    this.excavatorArm.x = this.excavatorBase.x;
    this.excavatorArm.y = this.excavatorBase.y;

    //setup listeners
    this.setEventListeners();

    //debug
    let curve = new Phaser.Curves.Line(
      new Phaser.Math.Vector2(50, 50),
      new Phaser.Math.Vector2(700, 50)
    );

    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0xff0000, 1);

    curve.draw(graphics);

    this.bottle = this.matter.add.image(50, 50, "excavator-base");
    this.bottle.setScale(0.5);
    this.bottle.setFriction(0.15);

    //collision
    this.excavatorArm.setOnCollideWith(this.bottle, (pair) => {
      console.log("collision 2", this.bottle);
      console.log("collision", pair);
    });

    //let's see if we can listen for vue store events
    store.subscribe((mutation, state) => {
      //TODO: Something awesome
    });
  }

  // Set event listeners here
  setEventListeners() {
    this.excavatorArm.setInteractive();
    this.excavatorArm.on(
      "pointerdown",
      (pointer, localX, localY, event) => {
        this.excavatorArmTween = this.tweens.add({
          targets: this.excavatorArm,
          angle: { from: 0, to: 90 },
          duration: 500,
          ease: "Linear",
          yoyo: true,
          repeat: 0,
          onComplete: () => {
            //console.log("excavator arm tween complete");
          },
        });
      },
      this
    );
  }

  update(time, delta) {
    if (this.bottle.x >= 600) {
      this.debugDir = "left";
    }

    if (this.bottle.x <= 50) {
      this.debugDir = "right";
    }

    if (this.debugDir == "left") {
      this.bottle.x -= 1;
    }

    if (this.debugDir === "right") {
      this.bottle.x += 1;
    }
  }
}
