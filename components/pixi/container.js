import { Container, Sprite, Texture, Loader, RenderTexture, Graphics } from 'pixi.js'
import Fish from './utils/fish'
import Enemy from './utils/enemy'
import App from './app'
import Vector2 from './common/vector2'

import FishCirveFilter from './filters/fishCirveFilter'
import WaveCircle from './utils/waveCircle'
import { loadTextures } from './common/utils'


class _myContainer extends Container {

  constructor(){
    super()
    this.requireFishNum = 0  // 魚密度 このパラメータ更新したら自動で魚追加される
    this.fishes = []
    this.fishTextures = []
    this.enemies = []

    this.mouse = null  // クリック時のマウス情報を格納
    this.fingers = []  // タップ時の指座標とか格納

    this.screen = App.renderer.screen

    this.isClicking = false
    window.addEventListener('mousedown', this.onClickStart)
    window.addEventListener('mousemove', this.onClickMove)
    window.addEventListener('mouseup', this.onClickEnd)
    window.addEventListener('touchstart', this.onClickStart)
    window.addEventListener('touchmove', this.onClickMove)
    window.addEventListener('touchend', this.onClickEnd)

    this.waveTextureContainer = new Container()  //waveTexture用のコンテナ 直接はレンダリングしなくてよい

    this.loadTextures()

  }

  onClickStart = (e) =>{
    // if(e && e.cancelable) return  // リンクならやめる
    this.isClicking = true
    let enemy
    if(e.touches) {
      for(const i in e.touches) {
        if(!(e.touches[i] instanceof Touch)) continue
        enemy = new Enemy(e.touches[i].pageX, e.touches[i].pageY, 1)
        this.fingers.push(enemy)
        this.enemies.push(enemy)
        // 一個じゃ物足りないので何個か作成
        for(let j = 0; j < 5; j++) {
          const RO = new Vector2((Math.random()-0.5) * 150, (Math.random()-0.5) * 150)
          const duration = j * 100
          setTimeout(()=>this.waveInit(e.touches[i].pageX + RO.x, e.touches[i].pageY+RO.y), duration)
        }
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

    if(Math.random() > 0.1) return  //全フレームwaveを発生させると多すぎるのでちょっと減らす
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

  async loadTextures() {
    if(this.fishTextures.length) {
      this.requireFishNum = this.screen.width * this.screen.height / (200*200)  // 200x200に一匹の密度
      this.onResize()
      return
    }
    const url = "/assets/images/pixi/fishImages.json"
    try {
      new Loader().add(url).load((_, resources) => {

        const texObj = resources[url].textures
        const textures = Object.keys(texObj).map((key) => texObj[key])

        this.fishTextures = textures
        // ローディングが完了したら魚の必要数を設定することでupdateないで自動的に生成される
        this.requireFishNum = this.screen.width * this.screen.height / (200*200)  // 200x200に一匹の密度
        this.onResize()
      })
    } catch(err) {
      console.log(err)
    }
  }

  fishInit() {
    if(this.fishTextures.length == 0) return false
    const size = Math.random() > 0.05 ? (Math.random()*20) + 50 : (Math.random()*50) + 150
    const sprite = new Fish(this.fishTextures, size)
    sprite.play()
    this.addChild(sprite)
    this.fishes.push(sprite)
  }

  waveInit(x, y) {
    const wave = new WaveCircle(x, y);
    this.waveTextureContainer.addChild(wave)
    wave.spread().then(()=>{
      this.waveTextureContainer.removeChild(wave)
    })  //終わったら削除
  }

  Update() {

    // fishのアップデート
    for(const i in this.fishes) {
      let others = Array.from(this.fishes)
      others.splice(i, 1)

      this.fishes[i].Update(others, this.enemies, i)
    }

    // リサイズなどで急激に数が減った時はこれで補完する
    if(this.fishes.length < this.requireFishNum) {
      // 無限ループ注意
      for(let i = 0; i < this.requireFishNum - this.fishes.length; i++) {
        this.fishInit()
      }
    }

    App.renderer.render(this.waveTextureContainer, this.waveTexture)  //レンダーテクスチャをレンダリング
    if(this.fishCirveFilter) this.fishCirveFilter.uniforms.u_animTime += 0.03
  }

  onResize =()=> {
    console.log("container : ", this.screen.width, this.screen.height)
    // 魚Textureののローディングが完了しているかどうか
    if(!this.fishTextures.length) return

    const sw = this.screen.width > 600 ? 600 : this.screen.width
    this.requireFishNum = sw * this.screen.height / (200*200)  // あるべき密度を更新

    // 密度えぐいことなるのでサイズ変わった時に画面外にいるやつは削除する
    // その後どうせ自動で補完されるから
    for(const i in this.fishes) {
      const fish = this.fishes[i]
      const pos = fish.position
      const offset = 100
      if(pos.x < -offset || pos.x > this.screen.width+offset || pos.y < -offset || pos.y > this.screen.height+offset) {
        this.removeChild(fish)
        this.fishes.splice(i, 1)
      }
    }

    this.waveTexture = RenderTexture.create({
      width: this.screen.width,
      height: this.screen.height
    })

    this.fishCirveFilter = new FishCirveFilter(this.waveTexture)
    this.fishCirveFilter.uniforms.u_resolution = {x: this.screen.width, y: this.screen.height}
    this.filters = [this.fishCirveFilter]  //画面外の魚はそもそもapp.screenによって考慮されない

    // 背景いっぱいに広がるbackground
    if(this.background) this.background.clear()
    this.background = new Graphics().beginFill(0x000000).drawRect(0, 0, this.screen.width, this.screen.height).endFill()
    this.background.alpha = 0
    this.addChild(this.background)
  }

}

const myContainer = new _myContainer()
export default myContainer