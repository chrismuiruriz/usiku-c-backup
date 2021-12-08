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
        this.screenWidth - 270,
        this.sceneData.screenCenterY + 6,
        "dock",
        null,
        {
          label: "dock",
        }
      )
      .setStatic(true);

    //the boat
    this.boat = this.scene.matter.add
      .sprite(this.dock.x + 66, this.dock.y + 4.5, "boat", null, {
        label: "boat",
      })
      .setStatic(true);

    this.createFactoryStationButtons();
  }

  //create factory station buttons
  createFactoryStationButtons() {
    const textStyle = {
      font: "bold 16px Arial",
      fill: "#FFFFFF",
      align: "center",
    };

    const quizTextStyle = {
      font: "bold 18px Arial",
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

    this.optionB = this.scene.add.text(
      this.greenTriangleButton.x - 16,
      this.greenTriangleButton.y - this.greenTriangleButton.height + 11,
      `...`,
      textStyle
    );

    this.redTriangleButton = this.scene.add.sprite(
      this.greenTriangleButton.x - this.greenTriangleButton.width - 20,
      this.greenTriangleButton.y,
      "red-triangle-button"
    );

    this.optionA = this.scene.add.text(
      this.redTriangleButton.x - 16,
      this.redTriangleButton.y - this.redTriangleButton.height + 11,
      `...`,
      textStyle
    );

    this.blueTriangleButton = this.scene.add.sprite(
      this.greenTriangleButton.x + this.greenTriangleButton.width + 20,
      this.greenTriangleButton.y,
      "blue-triangle-button"
    );

    this.optionC = this.scene.add.text(
      this.blueTriangleButton.x - 16,
      this.blueTriangleButton.y - this.blueTriangleButton.height + 11,
      `...`,
      textStyle
    );

    this.question = this.scene.add.text(
      this.factoryStation.x - this.factoryStation.width / 2 + 120,
      this.factoryStation.y - 68,
      `...`,
      quizTextStyle
    );
  }
}
