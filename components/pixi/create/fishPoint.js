import { Sprite } from "@pixi/sprite";
import Vector2 from "../common/vector2";

export default class FishPoint extends Sprite {
  constructor(texture, x, y) {
    super(texture)

    this.x = x
    this.y = y

    this.defaultPosition = new Vector2(x, y)

    this.width = this.height = 10
    this.anchor.set(0.5)
  }
}