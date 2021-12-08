export default class LapFactory {
  constructor(scene) {
    this.scene = scene;
  }

  test() {
    console.log("this scene factory", this.scene.factoryStation);
  }
}
