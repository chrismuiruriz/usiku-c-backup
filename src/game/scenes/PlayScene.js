import { Scene } from "phaser";
import Quiz from "../data/Quiz";
import LabStation from "../sections/LabStation";
import FactoryStation from "../sections/FactoryStation";
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

    this.trucks = [];
    this.truckFollowConfig = {
      duration: 10000,
      ease: "Sine.easeInOut",
      rotateToPath: true,
      verticalAdjust: true,
    };

    this.isDebug = false;
    this.debugAlphaHalf = 0;
    this.debugAlphaFull = 0;
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
        this.debugAlphaHalf
      )
      .setOrigin(0.5);

    this.createPipes();

    this.createShapes();

    this.drawRiverPath();

    this.createBottle();

    this.drawBottleFromRiverPath();

    this.createExcavator();

    this.createTruck();

    this.createHUD();

    /* nothing else after this */

    this.quizList = new Quiz();

    this.labStation = new LabStation(this);

    this.labStation.createLabStation();

    this.factoryStation = new FactoryStation(this, {
      screenWidth: this.screenWidth,
      screenHeight: this.screenHeight,
      screenCenterX: this.screenCenterX,
      screenCenterY: this.screenCenterY,
    });

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

    /*********************/

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

    /*********************/
    //this.createCleanOrPolluteIcon();
  }

  //create cleanOrPollute icon
  createCleanOrPolluteIcon() {
    let cleanOrPolluteIcon = this.physics.add
      .sprite(
        this.farmCleanButton.x + this.farmCleanButton.width / 2,
        this.farmCleanButton.y + this.farmCleanButton.height,
        "clean-pollute-icon"
      )
      .setInteractive({ draggable: true, dropZone: true });

    cleanOrPolluteIcon.on("drag", (pointer, dragX, dragY) => {
      cleanOrPolluteIcon.x = dragX;
      cleanOrPolluteIcon.y = dragY;
    });

    cleanOrPolluteIcon.on("drop", (pointer, gameObject, dropZone) => {
      //get the difference between farmCleanButton and cleanOrPolluteIcon x position and check if it's less than 20
      if (Math.abs(this.farmCleanButton.x - cleanOrPolluteIcon.x) < 20) {
        console.log("drop icon on clean");
        cleanOrPolluteIcon.destroy();
        this.labStation.createPebble(2);
      }

      if (Math.abs(this.farmPollutingButton.x - cleanOrPolluteIcon.x) < 20) {
        console.log("drop icon on pollute");
        cleanOrPolluteIcon.destroy();
        this.labStation.createPebble(1);
      }
    });
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
      .setOrigin(0.5)
      .setInteractive();

    this.menuButton.on("pointerdown", () => {
      this.toggleFullScreen();
    });
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
    this.excavatorArm.setAngle(90);
    this.excavatorArm.setOrigin(0.5, 0.75);
    this.excavatorArm.setAngle(90);
    this.excavatorArm.setFriction(0.005);

    this.excavatorArm.x = this.excavatorBase.x;
    this.excavatorArm.y = this.excavatorBase.y;
  }

  //create track
  createTruck() {
    this.drawTruckPath();

    this.truckFollowPath();
  }

  //draw truck path
  drawTruckPath() {
    let graphics = this.add.graphics();

    this.truckLine = new Phaser.Geom.Line(
      0,
      this.screenHeight - 20,
      800,
      this.screenHeight - 20
    );

    let points = [];

    points.push(this.truckLine.getPointA());

    //push points
    points.push(new Phaser.Math.Vector2(170, this.screenHeight - 60));

    points.push(new Phaser.Math.Vector2(350, this.screenHeight - 180));

    points.push(new Phaser.Math.Vector2(465, this.screenHeight - 180));

    points.push(new Phaser.Math.Vector2(600, this.screenHeight - 45));

    points.push(this.truckLine.getPointB());

    this.truckCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, this.debugAlphaFull);
    this.truckCurve.draw(graphics, 64);
    let ppaths = [];
    for (var i = 0; i < this.truckCurve.points.length; i++) {
      ppaths.push(
        this.truckCurve.points[i].x + "," + this.truckCurve.points[i].y
      );
      graphics.fillCircle(
        this.truckCurve.points[i].x,
        this.truckCurve.points[i].y,
        4
      );
    }
  }

  //truck follow path
  truckFollowPath() {
    //this.truckFollow = this.add.follower(this.truckCurve, 0, 730, "truck");

    //add 10 truckFollow to trucks array
    for (var i = 0; i < 10; i++) {
      this.trucks.push(
        this.add.follower(this.truckCurve, 0 - 30, 730, "truck")
      );
    }

    //set timeout of 2 seconds
    setTimeout(() => {
      this.trucks[0].startFollow(this.truckFollowConfig);
    }, 2000);
  }

  //keep track of the trucks
  trackTruck() {
    this.trucks.forEach((truck, idx) => {
      let truckX = truck.x;
      let truckY = truck.y;

      //let's keep track of the moving truck
      if (truck.isFollowing()) {
        //check if truckX is between 465 and 467
        if (
          Math.round(truckX) >= 455 &&
          Math.round(truckX) <= 456 &&
          !truckY.isFull
        ) {
          this.trucks[idx].isActive = true;
          truck.pauseFollow();
        }

        //if this truck is full and truckX rounded is greater than 700
        if (this.trucks[idx].isFull && Math.round(truckX) >= 760) {
          //destroy truck
          this.trucks[idx].destroy();
          //remove truck from trucks array
          this.trucks.splice(idx, 1);

          //generate a new quiz
          this.factoryStation.generateQuiz();
        }
      }
    });
  }

  //creaed HUD
  createHUD() {
    //stars bg
    this.starsBg = this.add
      .image(90, this.screenHeight / 2 + 5, "stars-bg")
      .setScale(1.5, 2.2)
      .setOrigin(0.5);

    this.star1 = this.add
      .sprite(90, this.starsBg.y - this.starsBg.height / 2, "stars")
      .setFrame(0);

    this.star2 = this.add
      .sprite(90, this.star1.y + this.star1.height + 7, "stars")
      .setFrame(1);

    this.star3 = this.add
      .sprite(90, this.star2.y + this.star2.height + 7, "stars")
      .setFrame(1);

    //text style
    const textStyle = {
      font: "bold 16px Arial",
      fill: "#FFFFFF",
      align: "center",
    };

    //clock
    this.clockBg = this.add.sprite(
      this.star2.x + 75,
      this.star2.y - 10,
      "clock-bg"
    );
    this.clockBg.setScale(0.7);
    this.clockText = this.add
      .text(this.clockBg.x, this.clockBg.y, "00:00", textStyle)
      .setOrigin(0.5)
      .setAngle(-90);

    //progress bar
    this.progressBarGreen = this.add
      .sprite(
        this.starsBg.x - this.starsBg.width / 2 - 5,
        this.star2.y,
        "big-progress-bar"
      )
      .setOrigin(1, 1)
      .setScale(1, 0.5);
    this.progressBarGreen.setFrame(1);
    this.progressBarGreen.setY(this.star2.y + this.progressBarGreen.height / 2);
    //this.progressBarGreen.scaleY = 0.1;

    this.progressBarRed = this.add
      .sprite(
        this.progressBarGreen.x - this.progressBarGreen.width + 2,
        this.star2.y,
        "big-progress-bar"
      )
      .setOrigin(1, 1)
      .setAngle(180)
      .setScale(1, 0.5);
    this.progressBarRed.setFrame(0);
    this.progressBarRed.setY(this.star2.y - this.progressBarRed.height / 2);
    //this.progressBarRed.scaleY = 0.1;

    //title bar
    this.titleBar = this.add.sprite(0, this.star2.y, "brown-bar-title");
    this.titleBar.x = this.titleBar.width / 2;
    this.titleText = this.add
      .text(this.titleBar.x, this.titleBar.y, "ROUND 1 OF 1", textStyle)
      .setOrigin(0.5)
      .setAngle(-90);
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
          angle: { from: 90, to: 0 },
          duration: 447,
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

    //let's truck the trucks
    this.trackTruck();
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

    graphics.lineStyle(4, 0xffffff, this.debugAlphaFull);
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

    graphics.lineStyle(4, 0xffffff, this.debugAlphaFull);
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

      this.trucks.forEach((truck, idx) => {
        if (truck.isActive) {
          this.trucks[idx].isActive = false;
          this.trucks[idx].isFull = true;
          setTimeout(() => {
            truck.resumeFollow();

            //make sure we have some trucks left
            if (this.trucks.length > 1) {
              this.trucks[idx + 1].startFollow(this.truckFollowConfig);
            }
          }, 100);
        }
      });
    } else {
      let d = this.deltaTimeRemoveBottle / this.bottleRemoveFromRiverDuration;
      var p = this.bottleFromRiverCurve.getPoint(d);

      this.bottle.setPosition(p.x, p.y);
    }
  }

  // helpers debug
  toggleFullScreen() {
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
    } else {
      this.scale.stopFullscreen();
    }
  }
}
