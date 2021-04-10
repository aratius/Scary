import Vector2 from '../common/vector2'

export default class Enemy extends Vector2 {

  constructor(x, y, power) {
    super(x, y)
    this.power = power
  }

  updatePosition(x, y) {
    this.x = x
    this.y = y
  }

}