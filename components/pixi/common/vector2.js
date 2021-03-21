import { Point } from 'pixi.js'

export default class Vector2 extends Point {

  constructor(x, y) {
    super(x, y)
    this.x = x
    this.y = y
  }

  /**
   * x, yを斜辺1の直角三角形の二辺の長さに正規化
   * @param {num} x
   * @param {num} y
   */
  static normalization(x, y) {
    if(x==0||y==0) return new Vector2(0, 0)  // xかyが0でnormalizationが簡単にバグる
    const hypotenuse = Math.sqrt(x*x + y*y)
    x *= (1 / hypotenuse)
    y *= (1 / hypotenuse)
    return new Vector2(x, y)
  }

  static getHyPotenuse(vec2) {
    if(vec2.x == 0 || vec2.y == 0) return new Vector2(0, 0)
    return Math.sqrt(Math.pow(vec2.x,2) + Math.pow(vec2.y, 2))
  }

  /**
   * 向きベクトルを足し算
   * 向きなので0~1に正規化
   * @param {Vector2} power1
   * @param {Vector2} power2
   * @returns
   */
  static addDir(power1, power2) {
    let x = power1.x + power2.x
    let y = power1.y + power2.y
    return this.normalization(x, y)
  }

  /**
   * 二点を結ぶベクトル
   * @param {*} pos1
   * @param {*} pos2
   */
  static getDir(pos1, pos2) {
    let x = pos1.x - pos2.x
    let y = pos1.y - pos2.y
    return this.normalization(x, y)
  }

  /**
   * ただのベクトル足し算
   * @param {Vector2} speed1
   * @param {Vector2} speed2
   * @returns
   */
  static addSpeed(speed1, speed2) {
    return new Vector2(speed1.x+speed2.x, speed1.y+speed2.y)
  }

  /**
   *ただのベクトル掛け算
   * @param {Vector2} speed
   * @param {Vector2} multi
   */
  static multiSpeed(speed, multi) {
    if(multi instanceof Vector2) {
      return new Vector2(speed.x * multi.x, speed.y * multi.y)
    }else {
      return new Vector2(speed.x * multi, speed.y * multi)
    }
  }

  /**
   * 二点間の距離
   * @param {Vector2} pos1
   * @param {Vector2} pos2
   * @returns
   */
  static getDist(pos1, pos2) {
    const dist = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
    return dist
  }

  /**
   *
   * @param {Vector2} pos
   * @param {float} offset
   * @param {Object} screen  // has width n' height
   * @returns
   */
  static outOfScreen(pos, offset, screen) {
    const newPos = pos
    if(pos.x > screen.width + offset/2) {
      newPos.x = -offset/2
    }else if(pos.x < -offset/2) {
      newPos.x = screen.width+offset/2
    }
    if(pos.y > screen.height + offset/2) {
      newPos.y = -offset/2
    }else if(pos.y < -offset/2) {
      newPos.y = screen.height+offset/2
    }

    return newPos
  }




  static Mode = {
    Gravity: "hoge",
    Repulsive: "bar"
  }
  /**
   * distThrよりちかい他のスプライトに対する位置関係ベクトルの平均（距離近いほど影響は大きい）
   * @param {Fish} me
   * @param {Fish[]} other
   * @param {float} distThr
   */
  static getVectorAverage(me, others, distThr, mode) {
    let powerDir = new Vector2(0, 0)
    let power = 0
    for(const i in others) {
      const o = others[i]
      const dist = this.getDist(me, o)
      let addPower
      if(mode == this.Mode.Gravity) addPower = dist
      else if(mode == this.Mode.Repulsive) addPower = distThr - dist
      if(dist < distThr) {
        powerDir.x += this.getDir(o, me).x * addPower
        powerDir.y += this.getDir(o, me).y * addPower
        power += addPower
      }
    }

    power/=others.length
    if(isNaN(power)) power = 0

    return {dir: this.normalization(powerDir.x, powerDir.y), power: power}
  }

  /**
   * distThreより近い他のスプライトの速度ベクトルの平均（自分のベクトルは関係ない）
   * @param {Fish} me
   * @param {Fish[]} others
   * @param {float} distThr
   * @returns
   */
  static getDirectionAverage(me, others, distThr) {
    let powerDir = new Vector2(0, 0)
    let power = 0
    for(const i in others) {
      const o = others[i]
      const dist = this.getDist(me, o)
      if(dist < distThr) {
        powerDir = this.addSpeed(powerDir, o.speed)
        powerDir = this.multiSpeed(powerDir, (distThr - dist))
        power += (distThr - dist)
      }
    }

    power/=others.length
    if(isNaN(power)) power = 0

    return {dir: this.normalization(powerDir.x, powerDir.y), power: power}
  }

}