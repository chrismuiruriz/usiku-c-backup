import { Scene } from "phaser"; //to remove later
import Quiz from "../data/Quiz";

export default class FactoryStation {
  /**
   * FactoryStation constructor.
   *
   * @param {string} scene - Game scene instance
   * @param {object} [sceneData] - An object containing some scene data
   * @param {string} [d=DefaultValue] - A optional string param
   *
   * @example
   *
   *   new FactoryStation(scene, {scene.screenWidth, scene.screenHeight})
   */
  constructor(scene, sceneData) {
    this.scene = scene;

    if (scene) {
      this.sceneData = sceneData;
    }

    this.quiz = new Quiz();
    this.currentQuestion = null;

    this.createFactoryStation();

    this.drawBoatPath();
  }

  /**
   *
   * @param {number} currentQuizIndex
   * @param {boolean} isRandom
   */
  generateQuiz(isRandom) {
    let currentQuizIdx = null;
    if (this.currentQuestion) {
      currentQuizIdx = this.currentQuestion.index;
    }

    let question = this.quiz.getNextQuestion(currentQuizIdx);
    this.question.setText(question.question);
    this.optionA.setText(question.A);
    this.optionB.setText(question.B);
    this.optionC.setText(question.C);

    this.currentQuestion = question;
  }

  clearQuiz() {
    this.question.setText("...");
    this.optionA.setText("...");
    this.optionB.setText("...");
    this.optionC.setText("...");
  }

  //create factory station
  createFactoryStation() {
    this.factoryStation = this.scene.matter.add
      .sprite(this.sceneData.screenWidth - 240, 0, "factory-station", null, {
        label: "factory-station",
      })
      .setStatic(true);

    this.factoryStation.setY(
      this.sceneData.screenHeight - this.factoryStation.height / 2
    );

    //the dock
    this.dock = this.scene.matter.add
      .sprite(
        this.sceneData.screenWidth - 270,
        this.sceneData.screenCenterY + 6,
        "dock",
        null,
        {
          label: "dock",
        }
      )
      .setStatic(true);

    this.createFactoryStationButtons();
  }

  //create factory station buttons
  createFactoryStationButtons() {
    const textStyle = {
      font: "bold 18px Arial",
      fill: "#FFFFFF",
      align: "center",
    };

    const quizTextStyle = {
      font: "bold 24px Arial",
      fill: "#FFFFFF",
      align: "center",
    };

    this.greenTriangleButton = this.scene.add.sprite(
      this.factoryStation.x - 16,
      0,
      "green-triangle-button"
    );
    this.greenTriangleButton.y =
      this.factoryStation.y +
      this.factoryStation.height / 2 -
      this.greenTriangleButton.height +
      5;

    // when the pointer is touched/clicked
    this.greenTriangleButton.setInteractive();
    this.greenTriangleButton.on("pointerdown", () => {
      if (this.quiz.checkAnswer(this.currentQuestion.index, "B")) {
        this.isCorrect();
      } else {
        this.isWrong();
      }

      this.startBoat();
    });

    this.optionB = this.scene.add
      .text(
        this.greenTriangleButton.x,
        this.greenTriangleButton.y - this.greenTriangleButton.height + 18,
        `...`,
        textStyle
      )
      .setOrigin(0.5);
    this.optionB.width = this.greenTriangleButton.width;

    /**********************/

    this.redTriangleButton = this.scene.add.sprite(
      this.greenTriangleButton.x - this.greenTriangleButton.width - 20,
      this.greenTriangleButton.y,
      "red-triangle-button"
    );

    // when the pointer is touched/clicked
    this.redTriangleButton.setInteractive();
    this.redTriangleButton.on("pointerdown", () => {
      if (this.quiz.checkAnswer(this.currentQuestion.index, "A")) {
        this.isCorrect();
      } else {
        this.isWrong();
      }
    });

    this.optionA = this.scene.add
      .text(
        this.redTriangleButton.x,
        this.redTriangleButton.y - this.redTriangleButton.height + 18,
        `...`,
        textStyle
      )
      .setOrigin(0.5);
    this.optionA.width = this.redTriangleButton.width;

    /**********************/

    this.blueTriangleButton = this.scene.add.sprite(
      this.greenTriangleButton.x + this.greenTriangleButton.width + 20,
      this.greenTriangleButton.y,
      "blue-triangle-button"
    );

    // when the pointer is touched/clicked
    this.blueTriangleButton.setInteractive();
    this.blueTriangleButton.on("pointerdown", () => {
      if (this.quiz.checkAnswer(this.currentQuestion.index, "C")) {
        this.isCorrect();
      } else {
        this.isWrong();
      }
    });

    this.optionC = this.scene.add
      .text(
        this.blueTriangleButton.x,
        this.blueTriangleButton.y - this.blueTriangleButton.height + 18,
        `...`,
        textStyle
      )
      .setOrigin(0.5);
    this.optionC.width = this.blueTriangleButton.width;

    this.question = this.scene.add
      .text(
        this.factoryStation.x - 16,
        this.factoryStation.y - 60,
        `...`,
        quizTextStyle
      )
      .setOrigin(0.5);
    this.question.width = this.factoryStation.width;
  }

  isCorrect() {
    this.clearQuiz();
    this.question.setText("Correct!");
  }

  isWrong() {
    this.clearQuiz();
    this.question.setText("Wrong!");
  }

  // Draw river path
  drawBoatPath() {
    let graphics = this.scene.add.graphics();

    let sWidth = this.sceneData.screenWidth;
    let sHeight = this.sceneData.screenHeight;

    this.boatLine = new Phaser.Geom.Line(
      this.dock.x + 66,
      this.dock.y + 4.5,
      sWidth - 235,
      50
    );

    let points = [];

    points.push(this.boatLine.getPointA());

    //push points
    points.push(new Phaser.Math.Vector2(this.boatLine.x1 - 60, 200));

    points.push(this.boatLine.getPointB());

    this.boatCurve = new Phaser.Curves.Spline(points);

    graphics.lineStyle(4, 0xffffff, this.scene.debugAlphaFull);
    this.boatCurve.draw(graphics, 64);
    let ppaths = [];
    for (var i = 0; i < this.boatCurve.points.length; i++) {
      ppaths.push(
        this.boatCurve.points[i].x + "," + this.boatCurve.points[i].y
      );
      graphics.fillCircle(
        this.boatCurve.points[i].x,
        this.boatCurve.points[i].y,
        4
      );
    }

    this.boatFollowPath();
  }

  boatFollowPath() {
    this.boat = this.scene.add
      .follower(this.boatCurve, this.dock.x + 66, this.dock.y + 4.5, "boat")
      .setAngle(-80);
  }

  startBoat() {
    this.boat.startFollow({
      duration: 6000,
      ease: "Sine.easeInOut",
      rotateToPath: true,
      yoyo: true,
      verticalAdjust: true,
      onComplete() {
        console.log("boat follow complete");
      },
    });
  }
}