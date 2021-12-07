import { Scene } from "phaser";
import store from "../../store";

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
    this.debugDir = "right";
    this.deltaTime = 0;
    this.deltaTimeRemoveBottle = 0;

    this.bottleRemoveFromRiverDuration = 850;

    this.isPlayerTouchingExcavator = false;
    this.isBottleTouchingExcavator = false;
    this.isBottleGrabbedFromRiver = false;

    this.isDebug = false;
    this.debugAlphaHalf = 1;
    this.debugAlphaFull = 1;
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
    this.labStation = this.add.sprite(130, 0, "lab-station").setOrigin(0, 0);

    this.labStation.setY(0);

    this.grid = this.add
      .sprite(this.labStation.x + 120, this.labStation.y + 95, "gridup")
      .setOrigin(0, 0);

    this.createLabStationButtons();

    this.createLabStationPuzzle();

    //START MAIN MOVE_TIMER
    this.timerRunning = true;
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.moveTimer,
      callbackScope: this,
      loop: true,
    });
  }

  // lab station buttons
  createLabStationButtons() {
    this.labStationRightButton = this.add.sprite(
      this.labStation.x + this.labStation.width / 2,
      0,
      "lab-station-right-button"
    );
    this.labStationRightButton.y = this.labStationRightButton.height / 2 + 5;
    this.labStationRightButton.setInteractive();
    this.labStationRightButton.on("pointerdown", () => {
      this.dropActive();
    });

    this.labStationDownButton = this.add.sprite(
      this.labStation.x + 51,
      0,
      "lab-station-down-button"
    );
    this.labStationDownButton.y = this.labStationDownButton.height / 2 + 8;
    this.labStationDownButton.setInteractive();
    this.labStationDownButton.on("pointerdown", () => {
      this.moveActiveUp();
    });

    /* ****************** */

    this.labStationUpButton = this.add.sprite(
      this.labStation.x + 51,
      0,
      "lab-station-up-button"
    );
    this.labStationUpButton.y = (this.labStationUpButton.height / 2 + 24) * 2;

    this.labStationUpButton.setInteractive();
    this.labStationUpButton.on("pointerdown", () => {
      this.moveActiveDown();
    });
  }

  //lab station puzzle
  createLabStationPuzzle() {
    // this.gridPuzzle = this.add
    //   .grid(
    //     this.labStation.x + 10,
    //     0,
    //     210,
    //     210,
    //     42,
    //     42,
    //     0xffffff,
    //     0,
    //     0xffffff,
    //     0.2
    //   )
    //   .setOrigin(0.5);

    // window.GRID_PUZZLE = this.gridPuzzle;

    // this.gridPuzzle.y = this.labStation.y + 35;

    this.tick_counter = 0; //used for tracking how many ticks have passed, and used by frequency
    this.default_pebble_frequency = 5; //every n timer-ticks we'll add a new default pebble;
    this.grid_count = 5; //it's a 5x5 grid;
    this.grid_size = 40; //fixed pixel size for grid and movements
    this.stack = []; //array used to hold the pool of pebbles to be added to the grid.
    this.pebbles = []; //array of all pebbles on the board (except current active one)
    this.active_pebble = false; // currrently user-controllable pebble. there will only ever be ONE
    this.start_col = this.grid_count;
    this.start_row = Math.round(this.grid_count / 2);
    this.point_count = 0;

    this.createLabStationPuzzleIcons();
  }

  //create lab station puzzle icons
  createLabStationPuzzleIcons() {
    // this.puzzleIconCrossGreen = this.physics.add
    //   .sprite(434, 114, "lab-station-puzzle-icons")
    //   .setOrigin(0.5)
    //   .setScale(0.85)
    //   .setCollideWorldBounds(true)
    //   .setVelocityX(-30);
    // this.puzzleIconCrossGreen.setFrame(0);
    // this.puzzleIconCrossGreen.body.setBoundsRectangle(
    //   new Phaser.Geom.Rectangle(
    //     this.gridPuzzle.x - this.gridPuzzle.width / 2 + 5,
    //     this.gridPuzzle.y - this.gridPuzzle.height / 2,
    //     this.gridPuzzle.width,
    //     this.gridPuzzle.height
    //   )
    // );
    // this.add
    //   .graphics()
    //   .lineStyle(5, 0x00ffff, 0.5)
    //   .strokeRectShape(this.puzzleIconCrossGreen.body.customBoundsRectangle)
    //   .strokeRectShape(this.puzzleIconCrossGreen.body.customBoundsRectangle);
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

  //create track
  createTruck() {
    this.truck = this.add.sprite(
      this.screenWidth - 150,
      this.screenCenterY - 100,
      "truck",
      null,
      { label: "truck" }
    );

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

    const length = Phaser.Geom.Line.Length(this.truckLine);

    //push points
    points.push(new Phaser.Math.Vector2(170, this.screenHeight - 60));

    points.push(new Phaser.Math.Vector2(350, this.screenHeight - 180));

    points.push(new Phaser.Math.Vector2(465, this.screenHeight - 180));

    points.push(new Phaser.Math.Vector2(600, this.screenHeight - 45));

    points.push(this.truckLine.getPointB());

    this.truckCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, 0);
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
    var truck = this.add.follower(this.truckCurve, 0, 730, "truck");

    truck.startFollow({
      duration: 10000,
      yoyo: false,
      repeat: -1,
      rotateToPath: true,
      verticalAdjust: true,
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
    } else {
      let d = this.deltaTimeRemoveBottle / this.bottleRemoveFromRiverDuration;
      var p = this.bottleFromRiverCurve.getPoint(d);

      this.bottle.setPosition(p.x, p.y);
    }
  }

  //puzzle logic here
  moveTimer() {
    // console.log("move_tick", this.timerRunning);
    if (this.timerRunning == false) return;

    // ******** CHECK FOR MATCHING BEIGHBOURS & MARK THEM
    // ******** then EXPLODE MATCHES & INCREASE POINTS
    this.findMatches();

    // ******** MOVE ALL PEBBLES IF POSSIBLE
    this.pebbles.forEach((pebble) => {
      //   console.log("moving pebble", pebble);
      this.movePebbleIfPossible(pebble);
    });
    //then try moving the ACTIVE pebble as well
    this.movePebbleIfPossible(this.active_pebble, true);

    // ******** CHECK FOR MATCHING BEIGHBOURS & MARK THEM AGAIN, because the ACTIVE one just moved...
    // ******** then EXPLODE MATCHES & INCREASE POINTS
    this.findMatches();

    // ******** AUTO-ADD DEFAULT PEBBLE
    // if it's time to add another default pebble
    if (this.tick_counter % this.default_pebble_frequency == 0) {
      //ie. every n ticks based on default_pebble_frequency

      // add a default pebble to the stack
      this.createPebble("random");
    }

    // ******** CHECK IF WE'RE AT THE END OF THE GAME
    this.pebbles.some((pebble) => {
      //if it's already in the starting position, then we're done!
      if (pebble.col == this.start_col && pebble.row == this.start_row) {
        this.resetPuzzle();
        return true; // stop the parent loop
      }
    });

    // ******** ADD PEBBLE TO BOARD FROM STACK (if there isn't already an active_pebble)
    if (this.active_pebble === false) {
      var newPebble = this.stack.shift();
      // console.log("newPebble?", newPebble);
      if (newPebble) {
        newPebble.setVisible(true);
        this.active_pebble = newPebble; //make it the active pebble
      }
    }

    // END of activity
    this.tick_counter += 1; // increase the tick_count for next time.
  }

  // create a pebble of a specified type, and add it to the 'stack'
  createPebble(type) {
    console.log("creating pebble of type: ", type);

    var img_num = 1;
    var min = 1;
    var max = 5;
    if (type == "random") {
      img_num = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var pebble = this.add.sprite(0, 0, "lab-station-puzzle-icons");
    pebble.setFrame(img_num);
    pebble.setOrigin(1, 1); // using the bottom right corner, for alignment to rows/cols
    //pebble.setScale(0.8); //just to fit in the box. would be better to scale the graphic...
    pebble.type = img_num; //used for matching
    pebble.col = this.start_col; //used for positioning in updatePosition()
    pebble.row = this.start_row;

    pebble.setVisible(false); //hide it

    // set it's position to the starting square
    this.updatePosition(pebble);

    // add it to the containing 'stack' array
    this.stack.push(pebble);
    // console.log("updated STACK", this.stack);
  }

  updatePosition(pebble) {
    // console.log("going to square", pebble.col, pebble.row);
    var newX = this.grid.x + pebble.col * this.grid_size; //relative to GRID origin
    var newY = this.grid.y + pebble.row * this.grid_size;
    // console.log("going to newX, newY", newX, newY);
    pebble.x = newX;
    pebble.y = newY;
    // console.log("moved pebble", pebble);
  }

  movePebbleIfPossible(pebble, isActive) {
    if (!pebble) return false;

    // console.log("moving pebble", pebble, isActive);

    var canMove = true;
    if (pebble.col <= 1) {
      canMove = false; //can't move; it's at the end
    } else {
      //otherwise, check for collision
      this.pebbles.some((other_pebble) => {
        // console.log("checking other_pebble", other_pebble.col, pebble.col-1);
        if (
          other_pebble.row == pebble.row &&
          other_pebble.col == pebble.col - 1
        ) {
          //if there's a pebble immediately to the left already
          // console.log("can't move, blocked by", other_pebble);
          canMove = false; //can't move; it's at the end
          return true; //no need to go further in the loop
        }
      });
    }

    if (canMove == true) {
      // move it left 1 column
      pebble.col = pebble.col - 1;
      this.updatePosition(pebble);
    } else {
      // it's at the end of it's movement
      // if it's the ACTIVE_PEBBLE, make it part of the pebbles array and remove control
      if (isActive === true) {
        this.pebbles.push(pebble);
        this.active_pebble = false;
      }
    }
  }

  dropActive() {
    console.log("dropping active_pebble to bottom");
    if (!this.active_pebble) return false;

    var curCol = this.active_pebble.col;
    var targetCol = 1; //to start with...

    this.pebbles.forEach((blocker) => {
      if (blocker.row == this.active_pebble.row) {
        if (blocker.col < this.active_pebble.col) {
          targetCol = blocker.col + 1;
        }
      }
    });
    this.active_pebble.col = targetCol;
    this.updatePosition(this.active_pebble);
    this.pebbles.push(this.active_pebble);
    this.active_pebble = false;
    this.tick_counter = 0; // reset it so the next block appears on the next tick instaed of waiting
  }

  moveActiveUp() {
    if (!this.active_pebble) return false;

    var canMove = true;
    if (this.active_pebble.row <= 1) {
      canMove = false; //can't move up; it's at the end
    } else {
      //otherwise, check for collision above it
      this.pebbles.some((other_pebble) => {
        // console.log("checking other_pebble", other_pebble.row, this.active_pebble.row-1);
        if (
          other_pebble.col == this.active_pebble.col &&
          other_pebble.row == this.active_pebble.row - 1
        ) {
          //if there's a pebble immediately above already
          // console.log("can't move, blocked by", other_pebble);
          canMove = false; //can't move; it's at the end
          return true; //no need to go further in the loop
        }
      });
    }

    if (canMove == true) {
      // move it up 1 column
      this.active_pebble.row = this.active_pebble.row - 1;
      this.updatePosition(this.active_pebble);
    }
  }

  moveActiveDown() {
    if (!this.active_pebble) return false;

    var canMove = true;
    if (this.active_pebble.row >= this.grid_count) {
      canMove = false; //can't move down; it's at the end
    } else {
      //otherwise, check for collision above it
      this.pebbles.some((other_pebble) => {
        // console.log("checking other_pebble", other_pebble.row, this.active_pebble.row-1);
        if (
          other_pebble.col == this.active_pebble.col &&
          other_pebble.row == this.active_pebble.row + 1
        ) {
          //if there's a pebble immediately below already
          // console.log("can't move, blocked by", other_pebble);
          canMove = false; //can't move; it's at the end
          return true; //no need to go further in the loop
        }
      });
    }

    if (canMove == true) {
      // move it down 1 column
      this.active_pebble.row = this.active_pebble.row + 1;
      this.updatePosition(this.active_pebble);
    }
  }

  findMatches() {
    // console.log("checking for matches");

    this.pebbles.forEach((pebble) => {
      this.pebbles.some((other_pebble) => {
        // console.log("checking other_pebble", other_pebble.row, this.active_pebble.row-1);

        // if it's the same type
        if (other_pebble.type == pebble.type) {
          // check to each side
          if (
            (other_pebble.col == pebble.col &&
              other_pebble.row == pebble.row - 1) ||
            (other_pebble.col == pebble.col &&
              other_pebble.row == pebble.row + 1) ||
            (other_pebble.col == pebble.col - 1 &&
              other_pebble.row == pebble.row) ||
            (other_pebble.col == pebble.col + 1 &&
              other_pebble.row == pebble.row)
          ) {
            // console.log("found a match", other_pebble);
            pebble.matched = true; // set it as 'matched' as well
            return true; //no need to go further in the loop
          }
        }
      });
    });

    // console.log("pebbles", this.pebbles);

    this.processMatches(); //process matches immediately
  }

  processMatches() {
    // console.log("processing matches for pebbles", this.pebbles.length);

    // this.pebbles.forEach((pebble, index)=>{
    var i;
    for (i = this.pebbles.length - 1; i >= 0; i -= 1) {
      var pebble = this.pebbles[i];
      // console.log("processing pebble", i, pebble);
      if (pebble.matched == true) {
        // console.log("destroying pebble", i, pebble);
        this.point_count += 1; //get some points for it
        //passplayer4score();
        // console.log("setting points to", this.point_count);

        //this.points.text = this.point_count; //increase the point display

        pebble.destroy(); //delete it from the board
        this.pebbles.splice(i, 1); //remove it from the pebbles array
      }
    }
  }

  resetPuzzle() {
    console.log("GAME OVER");
    this.timerRunning = false;

    //reset some stuff...
    if (this.active_pebble) this.active_pebble.destroy();
    this.pebbles.forEach((pebble) => {
      pebble.destroy();
    });
    this.pebbles = [];
    this.active_pebble = false;

    this.timerRunning = true;
    this.createPebble("random")
  }
}
