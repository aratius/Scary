import * as PIXI from 'pixi.js'
import { Container, Sprite, Texture, Loader } from 'pixi.js'
import Vector2 from './common/vector2'
import Fish from './fish'
import Enemy from './enemy'
import App from './app'

export default class myContainer extends Container {

  constructor(){
    super()
    this.load()
    this.fishes = []
    this.enemies = []

    this.mouse = null
    this.fingers = []

    this.screen = App.renderer.screen

    this.isClicking = false
    window.addEventListener('mousedown', this.onClickStart)
    window.addEventListener('mousemove', this.onClickMove)
    window.addEventListener('mouseup', this.onClickEnd)
    window.addEventListener('touchstart', this.onClickStart)
    window.addEventListener('touchmove', this.onClickMove)
    window.addEventListener('touchend', this.onClickEnd)
  }

  onClickStart = (e) =>{
    this.isClicking = true
    let enemy
    if(e.touches) {
      for(const i in e.touches) {
        enemy = new Enemy(e.touches[i].pageX, e.touches[i].pageY, 1)
        this.fingers.push(enemy)
        this.enemies.push(enemy)
      }
    }else {
      enemy = new Enemy(e.pageX, e.pageY, 1)
      this.mouse = enemy
      this.enemies.push(enemy)
    }
  }

  /**
   * clickmoveはfingerには対応しない
   * @param {*} e
   * @returns
   */
  onClickMove = (e) => {
    if(!this.isClicking) return
    this.mouse.x = e.pageX
    this.mouse.y = e.pageY
  }

  onClickEnd = (e) => {
    this.isClicking = false
    for(const i in this.enemies) {
      for(const j in this.fingers) {
        if(this.enemies[i] == this.mouse || this.fingers[j]) this.enemies.splice(i, 1)
      }
    }
    this.mouse = null
    this.fingers = []
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
    const num = this.screen.width * this.screen.height / (200*200)  // 200x200に一匹の密度
    this.fishes = []
    for(let i = 0; i < num; i++) {
      const sprite = new Fish(textures)
      sprite.position.set(Math.random()*this.screen.width, Math.random()*this.screen.height)
      sprite.tint = 0x000000
      sprite.animationSpeed = 0.2
      sprite.width = sprite.height = (Math.random()*20) + 50
      sprite.alpha = 0
      sprite.anchor.set(0.5)
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
      let others = Array.from(this.fishes)
      others.splice(i, 1)

      this.fishes[i].Update(others, this.enemies, i)
    }
  }

}