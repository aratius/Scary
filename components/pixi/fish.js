import * as PIXI from 'pixi.js'
import { AnimatedSprite } from 'pixi.js'

export default class Fish extends PIXI.AnimatedSprite {

  constructor(textures) {
    super(textures)
    this.play()
  }

}