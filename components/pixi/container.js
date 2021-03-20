import * as PIXI from 'pixi.js'
import { Container, Sprite, Texture } from 'pixi.js'
import Vector2 from './common/vector2'

export default class myContainer extends Container {

  constructor(){
    super()
  }

  Init() {
    const texture = new Texture.from("/assets/images/pixi/fishes/fish_1.png")
    this.sprite = new Sprite(texture)
    this.sprite.position.set(100, 100)
    this.addChild(this.sprite)
  }

  Update() {

  }

}