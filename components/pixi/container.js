import * as PIXI from 'pixi.js'
import { Container, Sprite, Texture, Loader } from 'pixi.js'
import Vector2 from './common/vector2'
import Fish from './fish'
import App from './app'

export default class myContainer extends Container {

  constructor(){
    super()
    this.load()
    this.fishes = []
    this.screen = App.renderer.screen
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
    console.log(App)
    const num = this.screen.width * this.screen.height / (200*200)  // 200x200に一匹の密度
    this.fishes = []
    for(let i = 0; i < num; i++) {
      const sprite = new Fish(textures)
      sprite.position.set(Math.random()*this.screen.width, Math.random()*this.screen.height)
      sprite.tint = 0x000000
      sprite.animationSpeed = 0.2
      sprite.width = sprite.height = 60
      sprite.alpha = 0
      sprite.tint = i==0?0xff0000:0x000000
      sprite.play()
      this.addChild(sprite)
      this.fishes.push(sprite)
    }
  }

  Init() {

  }

  Update() {
    for(const i in this.fishes) {
      const others = Array.from(this.fishes)
      others.splice(i, 1)
      this.fishes[i].Update(others, i)
    }
  }

}