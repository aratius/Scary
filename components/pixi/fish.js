import * as PIXI from 'pixi.js'
import { AnimatedSprite } from 'pixi.js'
import gsap from 'gsap'
import Vector2 from './common/vector2'
import { getRadian } from './common/utils'
import App from './app'

export default class Fish extends PIXI.AnimatedSprite {

  constructor(textures) {
    super(textures)

    this.rotation = getRadian(Math.random()*360)
    const firstSpeed = 0.0001
    this.speed = new Vector2(Math.cos(this.rotation + getRadian(-90)), Math.sin(this.rotation + getRadian(-90)))

    this.play()
    this.appear()
  }

  appear(){
    gsap.to(this, {alpha: 1, duration: 3})
  }

  Update(others, enemies, i) {
    // 引力
    const gravity = Vector2.getVectorAverage(this, others, 200, Vector2.Mode.Gravity)
    const v1 = 0.002
    let speed1 = gravity.dir
    speed1 = Vector2.multiSpeed(speed1, v1 * gravity.power)
    this.speed = Vector2.addSpeed(this.speed, speed1)

    // 斥力
    const repulsive = Vector2.getVectorAverage(this, others, 100, Vector2.Mode.Repulsive)
    const v2 = 0.05
    let speed2 = repulsive.dir
    speed2 = Vector2.multiSpeed(speed2, -v2 * repulsive.power)
    this.speed = Vector2.addSpeed(this.speed, speed2)

    const enemy = Vector2.getVectorAverage(this, enemies, 200, Vector2.Mode.Repulsive)
    const v3 = 0.003
    let speed3 = enemy.dir
    speed3 = Vector2.multiSpeed(speed3, -v3 * enemy.power)
    this.speed = Vector2.addSpeed(this.speed, speed3)

    // 向力
    const direction = Vector2.getDirectionAverage(this, others, 250)
    const v4 = 0.002
    let speed4 = direction.dir
    speed4 = Vector2.multiSpeed(speed4, v4 * direction.power)
    this.speed = Vector2.addSpeed(this.speed, speed4)

    // 一定の減衰 遅すぎる時はしない
    if(Vector2.getHyPotenuse(this.speed) > 1) {
      this.speed = Vector2.multiSpeed(this.speed, 0.99)
    }

    this.position.x+=this.speed.x
    this.position.y+=this.speed.y

    // TODO: rotationもっと補間きかせる
    const targetRotation = Math.atan2(this.speed.x, -this.speed.y)
    this.rotation = targetRotation

    this.animationSpeed = Math.sqrt(Math.pow(this.speed.x,2) * Math.pow(this.speed.y,2)) * 0.05 + 0.08

    this.position = Vector2.outOfScreen(this.position, this.width+100, App.renderer.screen)
  }

}