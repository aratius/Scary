import { Sprite } from "@pixi/sprite";

export default class FishPoint extends Sprite {
  constructor(texture, x, y) {
    super(texture)

    this.x = x
    this.y = y

    this.width = this.height = 10
    this.anchor.set(0.5)
  }
}