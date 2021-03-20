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

  Update() {
    this.position.x+=this.speed.x
    this.position.y+=this.speed.y

    this.position = Vector2.outOfScreen(this.position, this.width, App.renderer.screen)
  }

}