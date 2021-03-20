import { Point } from 'pixi.js'

export default class Vector2 extends Point {

  constructor(x, y) {
    super(x, y)
    this.x = x
    this.y = y
  }

  /**
   *
   * @param {Vector2} pos
   * @param {float} size
   * @param {Object} screen  // has width n' height
   * @returns
   */
  static outOfScreen(pos, size, screen) {
    const newPos = pos
    if(pos.x > screen.width + size/2) {
      newPos.x = -size/2
    }else if(pos.x < -size/2) {
      newPos.x = screen.width+size/2
    }
    if(pos.y > screen.height + size.y) {
      newPos.y = -size/2
    }else if(pos.y < -size/2) {
      newPos.y = screen.height+size/2
    }

    return newPos
  }

}