import * as PIXI from 'pixi.js'
import { Container, Sprite, Texture, Loader } from 'pixi.js'
import Vector2 from './common/vector2'
import Fish from './fish'

export default class myContainer extends Container {

  constructor(){
    super()
    this.load()
    this.fishes = []
  }

  load() {
    const url = "/assets/images/pixi/fishImages.json"
    new Loader().add(url).load((loader, resources) => {
      const textures = []
      for(const key in resources[url].textures) textures.push(resources[url].textures[key])
      this.loadComplete(textures)
    })

  }

  loadComplete(textures) {
    console.log(textures)
    for(let i = 0; i < 30; i++) {
      const sprite = new Fish(textures)
      sprite.position.set(Math.random()*500, Math.random()*500)
      sprite.tint = 0x000000
      sprite.animationSpeed = 0.2
      sprite.width = sprite.height = 60
      sprite.autoUpdate = true
      sprite.play()
      this.addChild(sprite)
      this.fishes.push(sprite)
    }
  }

  Init() {
  }

  Update() {

  }

}