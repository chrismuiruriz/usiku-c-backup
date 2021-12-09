export default class LapFactory {
  constructor(scene) {
    this.scene = scene;

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
  }

  //create lab station
  createLabStation() {
    this.labStation = this.scene.add
      .sprite(130, 0, "lab-station")
      .setOrigin(0, 0);

    this.labStation.setY(0);

    this.grid = this.scene.add
      .sprite(this.labStation.x + 120, this.labStation.y + 95, "gridup")
      .setOrigin(0, 0);

    this.createLabStationButtons();

    //START MAIN MOVE_TIMER
    this.timerRunning = true;
    this.timedEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.moveTimer,
      callbackScope: this,
      loop: true,
    });
  }

  // lab station buttons
  createLabStationButtons() {
    this.labStationRightButton = this.scene.add.sprite(
      this.labStation.x + this.labStation.width / 2,
      0,
      "lab-station-right-button"
    );
    this.labStationRightButton.y = this.labStationRightButton.height / 2 + 5;
    this.labStationRightButton.setInteractive();
    this.labStationRightButton.on("pointerdown", () => {
      this.dropActive();
    });

    this.labStationDownButton = this.scene.add.sprite(
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

    this.labStationUpButton = this.scene.add.sprite(
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

  //puzzle logic here
  moveTimer() {
    if (this.timerRunning == false) return;

    // ******** CHECK FOR MATCHING BEIGHBOURS & MARK THEM
    // ******** then EXPLODE MATCHES & INCREASE POINTS
    this.findMatches();

    // ******** MOVE ALL PEBBLES IF POSSIBLE
    this.pebbles.forEach((pebble) => {
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
      this.createPebble("default");
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
    var img_num = 1;
    var min = 1;
    var max = 4;
    if (type == "random") {
      img_num = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var pebble = this.scene.add.sprite(0, 0, "lab-station-puzzle-icons");
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
  }

  updatePosition(pebble) {
    var newX = this.grid.x + pebble.col * this.grid_size; //relative to GRID origin
    var newY = this.grid.y + pebble.row * this.grid_size;
    pebble.x = newX;
    pebble.y = newY;
  }

  movePebbleIfPossible(pebble, isActive) {
    if (!pebble) return false;

    var canMove = true;
    if (pebble.col <= 1) {
      canMove = false; //can't move; it's at the end
    } else {
      //otherwise, check for collision
      this.pebbles.some((other_pebble) => {
        if (
          other_pebble.row == pebble.row &&
          other_pebble.col == pebble.col - 1
        ) {
          //if there's a pebble immediately to the left already
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
        if (
          other_pebble.col == this.active_pebble.col &&
          other_pebble.row == this.active_pebble.row - 1
        ) {
          //if there's a pebble immediately above already
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
        if (
          other_pebble.col == this.active_pebble.col &&
          other_pebble.row == this.active_pebble.row + 1
        ) {
          //if there's a pebble immediately below already
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
    this.pebbles.forEach((pebble) => {
      this.pebbles.some((other_pebble) => {
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
            pebble.matched = true; // set it as 'matched' as well
            return true; //no need to go further in the loop
          }
        }
      });
    });

    this.processMatches(); //process matches immediately
  }

  processMatches() {
    // this.pebbles.forEach((pebble, index)=>{
    var i;
    for (i = this.pebbles.length - 1; i >= 0; i -= 1) {
      var pebble = this.pebbles[i];
      if (pebble.matched == true) {
        this.point_count += 1; //get some points for it
        //passplayer4score();

        //this.points.text = this.point_count; //increase the point display

        pebble.destroy(); //delete it from the board
        this.pebbles.splice(i, 1); //remove it from the pebbles array
      }
    }
  }

  resetPuzzle() {
    this.timerRunning = false;

    //reset some stuff...
    if (this.active_pebble) this.active_pebble.destroy();
    this.pebbles.forEach((pebble) => {
      pebble.destroy();
    });
    this.pebbles = [];
    this.active_pebble = false;

    this.timerRunning = true;
    this.createPebble("random");
  }
}
