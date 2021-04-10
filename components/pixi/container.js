import { Container, Sprite, Texture, Loader } from 'pixi.js'
import Fish from './utils/fish'
import Enemy from './utils/enemy'
import App from './app'
import Vector2 from './common/vector2'

import FishCirveFilter from './filters/fishCirveFilter'
import WaveCircle from './utils/waveCircle'

export default class myContainer extends Container {

  constructor(){
    super()
    this.load()
    this.num = 0
    this.fishes = []
    this.fishTextures = []
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

    // this.filters = [new FishCirveFilter()]
  }

  onClickStart = (e) =>{
    this.isClicking = true
    let enemy
    if(e.touches) {
      for(const i in e.touches) {
        if(!(e.touches[i] instanceof Touch)) continue
        enemy = new Enemy(e.touches[i].pageX, e.touches[i].pageY, 1)
        this.fingers.push(enemy)
        this.enemies.push(enemy)

        this.waveInit(e.touches[i].pageX, e.touches[i].pageY);
      }
    }else {
      enemy = new Enemy(e.pageX, e.pageY, 1)
      this.mouse = enemy
      this.enemies.push(enemy)

      this.waveInit(e.pageX, e.pageY);

    }
  }

  /**
   * clickmoveはfingerには対応しない
   * @param {*} e
   * @returns
   */
  onClickMove = (e) => {
    if(!this.isClicking) return
    if(e.touches) return
    this.mouse.x = e.pageX
    this.mouse.y = e.pageY

    if(Math.random() > 0.3) return  //全フレームwaveを発生させると多すぎるのでちょっと減らす
    // RO means 'RandomOffset'
    const RO = new Vector2((Math.random()-0.5) * 50, (Math.random()-0.5) * 50)
    this.waveInit(e.pageX + RO.x, e.pageY+RO.y)
  }

  onClickEnd = (e) => {
    this.isClicking = false
    for(const i in this.enemies) {
      for(const j in this.fingers) {
        if(this.enemies[i] == this.fingers[j]) this.enemies.splice(i, 1)
      }
      if(this.enemies[i] == this.mouse) this.enemies.splice(i, 1)
    }
    this.mouse = null
    this.fingers = []
  }

  load() {
    const url = "/assets/images/pixi/fishImages.json"
    new Loader().add(url).load((loader, resources) => {
      this.fishTextures = []
      for(const key in resources[url].textures) this.fishTextures.push(resources[url].textures[key])
      this.loadComplete()
    })
  }

  loadComplete() {
    this.num = this.screen.width * this.screen.height / (200*200)  // 200x200に一匹の密度
    this.fishes = []
    for(let i = 0; i < this.num; i++) {
      // this.fishInit()
    }
  }

  fishInit() {
    if(this.fishTextures.length == 0) return false
    const size = Math.random() > 0.05 ? (Math.random()*20) + 50 : (Math.random()*50) + 150
    const sprite = new Fish(this.fishTextures, size)
    sprite.position.set(Math.random()*this.screen.width, Math.random()*this.screen.height)
    sprite.tint = 0x000000
    sprite.animationSpeed = 0.2
    sprite.alpha = 0
    sprite.anchor.set(0.5)
    sprite.play()
    this.addChild(sprite)
    this.fishes.push(sprite)
  }

  waveInit(x, y) {
    const wave = new WaveCircle(x, y);
    this.addChild(wave)
    wave.spread().then(()=>this.removeChild(wave))  //終わったら削除
  }

  Update() {
    for(const i in this.fishes) {
      let others = Array.from(this.fishes)
      others.splice(i, 1)

      this.fishes[i].Update(others, this.enemies, i)
    }

    // リサイズなどで急激に数が減った時はこれで補完する
    if(this.fishes.length < this.num) {
    //   // 無限ループ注意
      for(let i = 0; i < this.num - this.fishes.length; i++) {
        this.fishInit()
      }
    }
  }

  onResize =()=> {
    const scr = App.renderer.screen
    this.num = scr.width * scr.height / (200*200)  // あるべき密度を更新

    // 密度えぐいことなるのでサイズ変わった時に画面外にいるやつは削除する
    for(const i in this.fishes) {
      const fish = this.fishes[i]
      const pos = fish.position
      const offset = 100
      if(pos.x < -offset || pos.x > scr.width+offset || pos.y < -offset || pos.y > scr.height+offset) {
        this.removeChild(fish)
        this.fishes.splice(i, 1)
      }
    }
  }

}