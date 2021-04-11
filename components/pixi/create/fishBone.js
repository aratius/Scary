import { Container, Sprite } from "pixi.js"

export default class FishBones extends Container {
  constructor(texture, head, middle, tail) {
    super()

    this.head = new Bone(texture, head)
    this.addChild(this.head)

    this.middle = new Bone(texture, middle)
    this.addChild(this.middle)

    this.tail = new Bone(texture, tail)
    this.addChild(this.tail)

  }
}

class Bone extends Sprite {

  constructor(texture, point) {
    super(texture)
    this.position = point
    this.defaultPosition = point
    this.anchor.set(0.5)
    this.width = this.height = 10
    this.tint = 0xff3333
  }

}