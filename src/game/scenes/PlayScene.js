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
    this.deltaTime = 0;
  }

  async create(data) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

    this.sound.add("thud");

    //grid
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    const screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    //add game background
    this.add
      .image(screenCenterX, screenCenterY, "game-backround")
      .setOrigin(0.5);

    const grid = this.add
      .grid(
        screenCenterX,
        screenCenterY,
        this.screenWidth,
        this.screenHeight,
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

    this.bottle = this.matter.add.image(
      this.screenWidth - 150,
      350,
      "excavator-base"
    );
    this.bottle.setScale(0.3);
    this.bottle.setFriction(0.15);

    //collision
    this.excavatorArm.setOnCollideWith(this.bottle, (pair) => {
      this.bottle.setVelocity(0, 0);
      //this.deltaTime = -1;
      console.log("collision 2", this.bottle);
      console.log("collision", pair);
    });

    this.drawRiverPath();

    this.drawBottleFromRiverPath();

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
    // if (this.bottle.x >= 600) {
    //   this.debugDir = "left";
    // }

    // if (this.bottle.x <= 50) {
    //   this.debugDir = "right";
    // }

    // if (this.debugDir == "left") {
    //   this.bottle.x -= 1;
    // }

    // if (this.debugDir === "right") {
    //   this.bottle.x += 1;
    // }

    this.followRiverPath(delta);
  }

  // draw a path in the river that the bottle will follow
  drawRiverPath() {
    let graphics = this.add.graphics();

    this.riverLine = new Phaser.Geom.Line(
      this.screenWidth - 150,
      350,
      100,
      520
    );

    let points = [];

    points.push(this.riverLine.getPointA());

    const length = Phaser.Geom.Line.Length(this.riverLine);

    //push points
    points.push(new Phaser.Math.Vector2(876, 330));

    points.push(new Phaser.Math.Vector2(650, 410));

    points.push(new Phaser.Math.Vector2(450, 400));

    points.push(new Phaser.Math.Vector2(250, 440));

    points.push(this.riverLine.getPointB());

    this.riverCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, 1);
    this.riverCurve.draw(graphics, 64);
  }

  //bottle follow riverPath
  followRiverPath(delta) {
    this.deltaTime += delta;

    if (this.deltaTime >= 5000) {
      this.deltaTime = 0;
      this.bottle.setPosition(this.screenWidth - 150, 350);
    } else {
      let d = this.deltaTime / 5000;
      var p = this.riverCurve.getPoint(d);

      this.bottle.setPosition(p.x, p.y);
    }
  }

  //draw bottle from river path
  drawBottleFromRiverPath() {
    let graphics = this.add.graphics();

    this.bottleFromRiverLine = new Phaser.Geom.Line(360, 412, 445, 520);

    let points = [];

    points.push(this.bottleFromRiverLine.getPointA());
    const length = Phaser.Geom.Line.Length(this.bottleFromRiverLine);

    //push points
    points.push(new Phaser.Math.Vector2(420, 445));

    points.push(this.bottleFromRiverLine.getPointB());

    this.bottleFromRiverCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, 1);
    this.bottleFromRiverCurve.draw(graphics, 64);
  }

  //remove bottle from river path
  followBottleFromRiverPath() {}
}
