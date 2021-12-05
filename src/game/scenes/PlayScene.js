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
    this.deltaTimeRemoveBottle = 0;

    this.bottleRemoveFromRiverDuration = 850;

    this.isPlayerTouchingExcavator = false;
    this.isBottleTouchingExcavator = false;
    this.isBottleGrabbedFromRiver = false;
  }

  async create(data) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

    this.sound.add("thud");

    //grid
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    //add game background
    this.add
      .image(this.screenCenterX, this.screenCenterY, "game-backround")
      .setOrigin(0.5);

    const grid = this.add
      .grid(
        this.screenCenterX,
        this.screenCenterY,
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

    this.createPipes();

    this.createShapes();

    this.drawRiverPath();

    this.createBottle();

    this.drawBottleFromRiverPath();

    this.createExcavator();

    this.createFactoryStation();

    this.createLabStation();

    this.createMenuButton();

    this.createFarmIconButtons();

    //set up collisions
    this.setUpAllCollisions();

    //setup listeners
    this.setEventListeners();
  }

  //create pipes
  createPipes() {
    this.add
      .sprite(this.screenCenterX, this.screenCenterY, "pipes", null, {
        label: "pipes",
      })
      .setOrigin(0.5);
  }

  //create factory station
  createFactoryStation() {
    this.factoryStation = this.matter.add
      .sprite(this.screenWidth - 240, 0, "factory-station", null, {
        label: "factory-station",
      })
      .setStatic(true);

    this.factoryStation.setY(
      this.screenHeight - this.factoryStation.height / 2
    );

    //the dock
    this.dock = this.matter.add
      .sprite(this.screenWidth - 270, this.screenCenterY + 6, "dock", null, {
        label: "dock",
      })
      .setStatic(true);

    //the boat
    this.boat = this.matter.add
      .sprite(this.dock.x + 66, this.dock.y + 4.5, "boat", null, {
        label: "boat",
      })
      .setStatic(true);

    this.createFactoryStationButtons();
  }

  //create factory station buttons
  createFactoryStationButtons() {
    this.greenTriangleButton = this.add.sprite(
      this.factoryStation.x - 16,
      0,
      "green-triangle-button"
    );
    this.greenTriangleButton.y =
      this.factoryStation.y +
      this.factoryStation.height / 2 -
      this.greenTriangleButton.height +
      5;

    this.redTriangleButton = this.add.sprite(
      this.greenTriangleButton.x - this.greenTriangleButton.width - 20,
      this.greenTriangleButton.y,
      "red-triangle-button"
    );

    this.blueTriangleButton = this.add.sprite(
      this.greenTriangleButton.x + this.greenTriangleButton.width + 20,
      this.greenTriangleButton.y,
      "blue-triangle-button"
    );
  }

  //create lab station
  createLabStation() {
    this.labStation = this.matter.add
      .sprite(340, 0, "lab-station", null, { label: "lab-station" })
      .setStatic(true);

    this.labStation.setY(this.labStation.height / 2);

    this.createLabStationButtons();
  }

  // lab station buttons
  createLabStationButtons() {
    this.labStationRightButton = this.add.sprite(
      this.labStation.x,
      0,
      "lab-station-right-button"
    );
    this.labStationRightButton.y = this.labStationRightButton.height / 2 + 5;

    this.labStationDownButton = this.add.sprite(
      this.labStation.x - this.labStationRightButton.width * 2 - 11,
      0,
      "lab-station-down-button"
    );
    this.labStationDownButton.y = this.labStationDownButton.height / 2 + 8;

    this.labStationUpButton = this.add.sprite(
      this.labStation.x - this.labStationRightButton.width * 2 - 11,
      0,
      "lab-station-up-button"
    );
    this.labStationUpButton.y = (this.labStationUpButton.height / 2 + 24) * 2;
  }

  //created farm icon buttons
  createFarmIconButtons() {
    this.farmCleanButton = this.add.sprite(
      this.screenWidth - 310,
      0,
      "farm-clean-icon"
    );
    this.farmCleanButton.setY(this.farmCleanButton.height / 2);
    this.add
      .image(
        this.farmCleanButton.x,
        this.farmCleanButton.y + this.farmCleanButton.height / 2 + 10,
        "farm-clean-text"
      )
      .setAngle(-4);

    this.farmPollutingButton = this.add.sprite(
      this.screenWidth - 120,
      0,
      "farm-polluting-icon"
    );
    this.farmPollutingButton.setY(this.farmPollutingButton.height / 2);
    this.add
      .image(
        this.farmPollutingButton.x,
        this.farmPollutingButton.y + this.farmPollutingButton.height / 2 + 2,
        "farm-polluting-text"
      )
      .setAngle(4);
  }

  //create menu button
  createMenuButton() {
    this.menuButton = this.add
      .sprite(
        this.screenWidth - 50,
        this.screenCenterY - 90,
        "menu-button",
        null,
        {
          label: "menu-button",
        }
      )
      .setOrigin(0.5);
  }

  //create shapes
  createShapes() {
    this.shapes = {
      rectangle: [
        [
          { x: 35, y: -160 },
          { x: 65, y: -160 },
          { x: 65, y: 80 },
          { x: 35, y: 80 },
        ],
      ],
    };
  }

  //create bottle
  createBottle() {
    this.bottle = this.matter.add.image(
      this.screenWidth - 150,
      350,
      "excavator-base",
      null,
      { label: "bottle" }
    );
    this.bottle.setScale(0.3);
    this.bottle.setFriction(0.15);
  }

  //create exacavator
  createExcavator() {
    //add excavator base
    this.excavatorBase = this.matter.add.sprite(
      350,
      500,
      "excavator-base",
      null,
      { label: "excavator-base" }
    );
    this.excavatorBase.setStatic(true);
    this.excavatorBase.setOrigin(0.5, 0.5);

    //add excavator arm
    this.excavatorArm = this.matter.add.sprite(
      this.excavatorBase.x,
      50,
      "excavator-arm",
      null,
      {
        label: "excavator-arm",
        shape: { type: "fromVerts", verts: this.shapes.rectangle },
        render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
      }
    );
    this.excavatorArm.setStatic(true);
    this.excavatorArm.setOrigin(0.5, 0.75);
    //this.excavatorArm.setAngle(90);
    this.excavatorArm.setFriction(0.005);

    this.excavatorArm.x = this.excavatorBase.x;
    this.excavatorArm.y = this.excavatorBase.y;
  }

  // collisions
  setUpAllCollisions() {
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      //if the bottle is touching the excavator
      this.bottleAndExcavatorArmCollisionStart(bodyA, bodyB);
    });

    this.matter.world.on("collisionend", (event, bodyA, bodyB) => {
      //if bottle has stopped touching the excavator
      this.bottleAndExcavatorArmCollisionEnd(bodyA, bodyB);
    });
  }

  //bottle and excavator-arm collision start
  bottleAndExcavatorArmCollisionStart(bodyA, bodyB) {
    if (
      (bodyA.label === "bottle" && bodyB.label === "excavator-arm") ||
      (bodyB.label === "bottle" && bodyA.label === "excavator-arm")
    ) {
      this.isBottleTouchingExcavator = true;

      if (this.isPlayerTouchingExcavator) {
        this.isBottleGrabbedFromRiver = true;
      }
    }
  }

  //bottle and excavator-arm collision end
  bottleAndExcavatorArmCollisionEnd(bodyA, bodyB) {
    if (
      (bodyA.label === "bottle" && bodyB.label === "excavator-arm") ||
      (bodyB.label === "bottle" && bodyA.label === "excavator-arm")
    ) {
      this.isBottleTouchingExcavator = false;
    }
  }

  // Set event listeners here
  setEventListeners() {
    this.excavatorArm.setInteractive();
    this.excavatorArm.on(
      "pointerdown",
      (pointer, localX, localY, event) => {
        this.isPlayerTouchingExcavator = true;

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

    this.excavatorArm.on("pointerup", function(pointer, localX, localY, event) {
      this.isPlayerTouchingExcavator = false;
    });
  }

  update(time, delta) {
    //make sure the bottle is touching the excavator
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
    if (this.isBottleGrabbedFromRiver) {
      this.followBottleFromRiverPath(delta);
      return;
    }

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

    this.bottleFromRiverLine = new Phaser.Geom.Line(377, 410, 445, 540);

    let points = [];

    points.push(this.bottleFromRiverLine.getPointA());
    const length = Phaser.Geom.Line.Length(this.bottleFromRiverLine);

    //push points
    points.push(new Phaser.Math.Vector2(418, 453));

    points.push(this.bottleFromRiverLine.getPointB());

    this.bottleFromRiverCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, 1);
    this.bottleFromRiverCurve.draw(graphics, 64);
  }

  //remove bottle from river path
  followBottleFromRiverPath(delta) {
    this.deltaTimeRemoveBottle += delta;

    if (this.deltaTimeRemoveBottle >= this.bottleRemoveFromRiverDuration) {
      //reset
      this.isBottleGrabbedFromRiver = false;
      this.isBottleTouchingExcavator = false;
      this.isPlayerTouchingExcavator = false;

      this.deltaTimeRemoveBottle = 0;
      this.deltaTime = 0;
      this.bottle.setPosition(this.screenWidth - 150, 350);
    } else {
      let d = this.deltaTimeRemoveBottle / this.bottleRemoveFromRiverDuration;
      var p = this.bottleFromRiverCurve.getPoint(d);

      this.bottle.setPosition(p.x, p.y);
    }
  }
}
