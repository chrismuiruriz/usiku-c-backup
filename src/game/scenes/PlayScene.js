import { Scene } from "phaser";
import Quiz from "../data/Quiz";
import LabStation from "../sections/LabStation";
import FactoryStation from "../sections/FactoryStation";
import GameState from "../data/GameState";

export default class PlayScene extends Scene {
  constructor() {
    super({
      key: "PlayScene",
      physics: {
        arcade: {
          debug: false,
        },
        matter: {
          gravity: {
            x: 0,
            y: 0,
          },
          debug: false,
        },
      },
    });
  }

  init() {
    // Some games configurations
    this.isGamePaused = false;

    //game timer
    this.gameTimerDuration = 60; //secs default = 180
    this.gameTimerCountdown = 60; //secs default = 180
    this.gameTimer = new Phaser.Time.TimerEvent({
      delay: this.gameTimerDuration * 1000,
    });
    //use startAt: 10 * 1000; to handle pause = 90 secs

    this.truckSpeed = 3500;
    this.firstTruckStartDelay = 50;
    this.excavatorArmRotateSpeed = 223;
    this.bottleSpeedOnRiver = 5000;

    this.debugDir = "right";
    this.deltaTime = 0;
    this.deltaTimeRemoveBottle = 0;

    this.bottleRemoveFromRiverDuration = 425;

    this.isPlayerTouchingExcavator = false;
    this.isBottleTouchingExcavator = false;
    this.isBottleGrabbedFromRiver = false;

    this.trucks = [];
    this.truckFollowConfig = {
      duration: this.truckSpeed,
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

    this.gameState = new GameState();

    //add sounds
    this.soundCollectStar = this.sound.add("s-start-collected");
    this.soundRiverFlow = this.sound.add("s-river-flow", {
      volume: 0.5,
      loop: true,
    });
    this.soundRiverFlow.play();
    this.soundMoveExacavator = this.sound.add("s-excavator-move");
    this.soundPickTrash = this.sound.add("s-trash-picked");
    this.correctMatch = this.sound.add("s-correct-match");

    this.soundButtonClick = this.sound.add("s-button-click");

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

    this.drawMatatuTrack();

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

    this.createStarEmitter();

    // let's pause the game
    this.displayGuide();
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
    let cleanIcons = [0, 1, 2, 3];
    let dirtyIcons = [4, 5, 6, 7];

    let max = 7;
    let min = 0;
    let randomFrame = Math.floor(Math.random() * (max - min + 1)) + min;

    let cleanOrPolluteIcon = this.physics.add
      .sprite(
        this.farmCleanButton.x + this.farmCleanButton.width / 2,
        this.farmCleanButton.y + this.farmCleanButton.height,
        "drop-icons"
      )
      .setFrame(randomFrame)
      .setScale(0.8)
      .setInteractive({ draggable: true, dropZone: true });
    cleanOrPolluteIcon.iconType = randomFrame;

    cleanOrPolluteIcon.on("drag", (pointer, dragX, dragY) => {
      cleanOrPolluteIcon.x = dragX;
      cleanOrPolluteIcon.y = dragY;
    });

    cleanOrPolluteIcon.on("drop", (pointer, gameObject, dropZone) => {
      //get the difference between farmCleanButton and cleanOrPolluteIcon x position and check if it's less than 20
      if (Math.abs(this.farmCleanButton.x - cleanOrPolluteIcon.x) <= 40) {
        cleanOrPolluteIcon.destroy();
        this.labStation.createPebble(2);

        if (cleanIcons.includes(cleanOrPolluteIcon.iconType)) {
          this.emitStars(this.farmCleanButton.x, this.farmCleanButton.y);
          this.updateProgressBar(1, "farm");
        }
      }

      if (Math.abs(this.farmPollutingButton.x - cleanOrPolluteIcon.x) <= 40) {
        cleanOrPolluteIcon.destroy();
        this.labStation.createPebble(1);
        if (dirtyIcons.includes(cleanOrPolluteIcon.iconType)) {
          this.emitStars(
            this.farmPollutingButton.x,
            this.farmPollutingButton.y
          );
          this.updateProgressBar(1, "farm");
        }
      }
    });
  }

  //create menu button
  createMenuButton() {
    this.menuButton = this.add
      .sprite(
        this.screenWidth - 50,
        this.screenCenterY - 45,
        "menu-button",
        null,
        {
          label: "menu-button",
        }
      )
      .setOrigin(0.5)
      .setInteractive();

    this.menuButton.on("pointerdown", () => {
      this.soundButtonClick.play();
      this.openMenu();
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
      "bottle",
      null,
      { label: "bottle" }
    );
    this.bottle.setScale(0.4);
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
    for (var i = 0; i < 100; i++) {
      this.trucks.push(
        this.add.follower(this.truckCurve, 0 - 30, 730, "trucks").setFrame(0)
      );
    }

    //set timeout of 2 seconds
    setTimeout(() => {
      this.trucks[0].startFollow(this.truckFollowConfig);
    }, this.firstTruckStartDelay);
  }

  //keep track of the trucks
  trackTruck() {
    this.trucks.forEach((truck, idx) => {
      let truckX = truck.x;

      //let's keep track of the moving truck
      if (truck.isFollowing()) {
        //check if truckX is between 465 and 467
        if (Math.round(truckX) >= 455 && !truck.isFull) {
          this.trucks[idx].isActive = true;
          truck.pauseFollow();
        }

        //if this truck is full and truckX rounded is greater than 700
        if (this.trucks[idx].isFull && Math.round(truckX) >= 750) {
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
      .setFrame(0);

    this.star3 = this.add
      .sprite(90, this.star2.y + this.star2.height + 7, "stars")
      .setFrame(0);

    //text style
    const textStyle = {
      font: "bold 16px natlog",
      fill: "#F5D7A0",
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
      .bitmapText(
        this.clockBg.x,
        this.clockBg.y + 5,
        "segments-basic",
        "00:00",
        14,
        Phaser.Display.Align.CENTER
      )
      .setOrigin(0.5)
      .setAngle(-90);

    //progress bar
    this.progressBarGreen = this.add
      .sprite(
        this.starsBg.x - this.starsBg.width / 2 - 5,
        0,
        "big-progress-bar"
      )
      .setOrigin(1, 1)
      .setScale(1, 0);
    this.progressBarGreen.setFrame(1);
    this.progressBarGreen.setY(this.star2.y + this.progressBarGreen.height / 2);
    //this.progressBarGreen.scaleY = 0.1;

    this.progressBarRed = this.add
      .sprite(
        this.progressBarGreen.x - this.progressBarGreen.width + 2,
        0,
        "big-progress-bar"
      )
      .setOrigin(1, 1)
      .setAngle(180)
      .setScale(1, 1);
    this.progressBarRed.setFrame(0);
    this.progressBarRed.setY(this.star2.y - this.progressBarRed.height / 2);
    //this.progressBarRed.scaleY = 0.1;

    //title bar
    this.titleBar = this.add.sprite(0, this.star2.y, "brown-bar-title");
    this.titleBar.setOrigin(0, 0.5);
    this.titleBar.setScale(0.9, 1);
    this.titleBar.x = 0;
    this.titleText = this.add
      .bitmapText(
        this.titleBar.x + this.titleBar.width / 2 - 5,
        this.titleBar.y,
        "natural-log",
        `ROUND ${this.gameState.getCurrentRound()} OF 4`,
        26,
        Phaser.Display.Align.CENTER
      )
      .setOrigin(0.5)
      .setAngle(-90);

    //clock timer
    this.startGameTimer();
  }

  //lights the HUD
  lightStar(star) {
    let num = star;
    if (num == 3) {
      this.star3.setFrame(1);
    } else if (num == 2) {
      this.star2.setFrame(1);
    } else {
      this.star1.setFrame(1);
    }

    this.soundCollectStar.play();
  }

  //update progress bar
  //@param {string} source - excavator || factory || farm || lab
  updateProgressBar(point, source) {
    // 10pts = 0.1
    //decrese red bar
    let newRedScaleY = this.progressBarRed.scaleY - 0.005;
    this.progressBarRed.setScale(this.progressBarRed.scaleX, newRedScaleY);

    //increase green bar
    let newGreenScaleY = this.progressBarGreen.scaleY + 0.005;
    this.progressBarGreen.setScale(
      this.progressBarGreen.scaleX,
      newGreenScaleY
    );

    this.setGamePoints(point, source);
  }

  //set points
  setGamePoints(points, source) {
    let currentRound = this.gameState.getCurrentRound();
    switch (source) {
      case "excavator":
        this.gameState.setPlayerRoundScore(1, currentRound, points);
        break;
      case "factory":
        this.gameState.setPlayerRoundScore(2, currentRound, points);
        break;
      case "farm":
        this.gameState.setPlayerRoundScore(3, currentRound, points);
        break;
      case "lab":
        this.correctMatch.play();
        this.gameState.setRoundGroupScore(currentRound, points);
        this.gameState.setPlayerRoundScore(4, currentRound, points);
        break;
    }
    //TODO: better mechanics of lighting a star
    let roundScore = this.gameState.getRoundGroupScore(currentRound);
    if (roundScore == 7) {
      this.lightStar(3);
      this.gameState.setRoundStar(currentRound, 1);
    } else if (roundScore == 14) {
      this.lightStar(2);
      this.gameState.setRoundStar(currentRound, 2);
    } else if (roundScore == 21) {
      this.lightStar(1);
      this.gameState.setRoundStar(currentRound, 3);
    }
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

  createStarEmitter() {
    this.starEmitter = this.add.particles("star");

    this.starEmitter.createEmitter({
      lifespan: 1200,
      quantity: 3,
      speed: { min: 200, max: 350 },
      scale: { start: 0.8, end: 0.1 },
      rotate: { start: 0, end: 360 },
      on: false,
    });
  }

  emitStars(x, y) {
    this.starEmitter.emitParticleAt(x, y);
  }

  //bottle and excavator-arm collision start
  bottleAndExcavatorArmCollisionStart(bodyA, bodyB) {
    if (
      (bodyA.label === "bottle" && bodyB.label === "excavator-arm") ||
      (bodyB.label === "bottle" && bodyA.label === "excavator-arm")
    ) {
      this.isBottleTouchingExcavator = true;

      if (this.isPlayerTouchingExcavator && !this.bottleIsGrabbed) {
        this.isBottleGrabbedFromRiver = true;
        this.bottleIsGrabbed = true;
        this.emitStars(bodyA.gameObject.x, bodyA.gameObject.y);
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

        this.soundMoveExacavator.play();

        this.excavatorArmTween = this.tweens.add({
          targets: this.excavatorArm,
          angle: { from: 90, to: 0 },
          duration: this.excavatorArmRotateSpeed,
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

    // Listen for the resume event
    this.events.on(
      "resume",
      function() {
        this.soundRiverFlow.play();
      },
      this
    );
  }

  update(time, delta) {
    //make sure the bottle is touching the excavator
    this.followRiverPath(delta);

    //let's track the trucks
    this.trackTruck();

    //update timer
    let progress = this.gameTimer.getProgress() * this.gameTimerDuration;
    let absProgress = this.gameTimerCountdown - parseInt(progress.toFixed(0));
    let strProgress =
      absProgress < 10 ? `0${absProgress}:00` : `${absProgress}:00`;
    this.clockText.setText(strProgress);
    if (absProgress <= 0) {
      //times up - round over
      this.onGameTimerComplete();
    }
  }

  //use this to start the game time
  startGameTimer() {
    this.time.addEvent(this.gameTimer);
  }

  //use the to pause the game timer
  pauseGameTimer() {
    this.gameTimer.paused = true;
  }

  //use this to resume the game timer
  resumeGameTimer() {
    this.gameTimer.paused = false;
  }

  //use this to reset the game timer
  resetGameTimer() {
    this.time.addEvent(this.gameTimer);
  }

  //this is called once the timer elapses
  onGameTimerComplete() {
    this.soundRiverFlow.stop();
    this.scene.stop("PlayScene");
    this.scene.start("RoundCompleteScene", {
      server: {},
      onGameOver: {},
    });
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

    if (this.deltaTime >= this.bottleSpeedOnRiver) {
      this.deltaTime = 0;
      this.bottle.setPosition(this.screenWidth - 150, 350);
    } else {
      let d = this.deltaTime / this.bottleSpeedOnRiver;
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
            truck.setFrame(1);
            truck.resumeFollow();

            this.updateProgressBar(1, "excavator");

            //trash picked here
            this.soundPickTrash.play();

            this.bottleIsGrabbed = false;

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

  //matatu track
  drawMatatuTrack() {
    let graphics = this.add.graphics();

    let matatuLine = new Phaser.Geom.Line(
      this.screenWidth - 5,
      this.screenHeight - 5,
      this.screenWidth - 10,
      0
    );

    let points = [];

    points.push(matatuLine.getPointA());

    //push points
    points.push(
      new Phaser.Math.Vector2(this.screenWidth - 140, this.screenCenterY + 140)
    );

    points.push(matatuLine.getPointB());

    let matatuCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffff00, this.debugAlphaFull);
    matatuCurve.draw(graphics, 64);
    let ppaths = [];
    for (var i = 0; i < matatuCurve.points.length; i++) {
      ppaths.push(matatuCurve.points[i].x + "," + matatuCurve.points[i].y);
      graphics.fillCircle(matatuCurve.points[i].x, matatuCurve.points[i].y, 4);
    }

    // track followers
    let matatu = this.add
      .follower(
        matatuCurve,
        this.screenWidth - 5,
        this.screenHeight - 5,
        "matatus"
      )
      .setFrame(0);
    matatu.startFollow({
      duration: 3000,
      repeat: -1,
      rotateToPath: true,
      verticalAdjust: true,
    });

    this.drawMatatuTrack2();
  }

  drawMatatuTrack2() {
    let graphics = this.add.graphics();

    let matatuLine = new Phaser.Geom.Line(
      this.screenWidth + 25,
      0,
      this.screenWidth + 10,
      this.screenHeight - 40
    );

    let points = [];

    points.push(matatuLine.getPointA());

    //push points
    points.push(
      new Phaser.Math.Vector2(this.screenWidth - 105, this.screenCenterY + 140)
    );

    points.push(matatuLine.getPointB());

    let matatuCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xff0000, this.debugAlphaFull);
    matatuCurve.draw(graphics, 64);
    let ppaths = [];
    for (var i = 0; i < matatuCurve.points.length; i++) {
      ppaths.push(matatuCurve.points[i].x + "," + matatuCurve.points[i].y);
      graphics.fillCircle(matatuCurve.points[i].x, matatuCurve.points[i].y, 4);
    }

    // track followers
    let matatu2 = this.add
      .follower(matatuCurve, this.screenWidth + 25, 0, "matatus")
      .setFrame(1);
    matatu2.startFollow({
      duration: 2500,
      repeat: -1,
      rotateToPath: true,
      verticalAdjust: true,
    });
  }

  // open menu
  openMenu() {
    this.scene.pause("PlayScene");
    this.soundRiverFlow.stop();
    this.scene.launch("MenuScene", {
      server: {},
      onGameOver: {},
    });
  }

  // show guide
  displayGuide() {
    if (sessionStorage.seenGuide) {
      return;
    }

    sessionStorage.seenGuide = "yes";
    this.scene.pause("PlayScene");
    this.soundRiverFlow.stop();
    this.scene.launch("GamePlayGuideScene", {
      server: {},
      onGameOver: {},
    });
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
