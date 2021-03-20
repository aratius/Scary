import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'

export default class Container extends Container {

  constructor(){
    super()
  }

  init() {
    this.update()
  }

  update() {
    requestAnimationFrame(this.update)
    console.log('update')
  }

}