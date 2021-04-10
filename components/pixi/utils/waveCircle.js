import { Sprite, Texture } from 'pixi.js'
import gsap from 'gsap'

const waveTexrues = [
  Texture.from("/assets/images/pixi/waves/wave_1.png"),
  Texture.from("/assets/images/pixi/waves/wave_2.png"),
  Texture.from("/assets/images/pixi/waves/wave_3.png"),
]

export default class WaveCircle extends Sprite {
  constructor (x, y) {
    super(waveTexrues[Math.floor(Math.random() * waveTexrues.length)])
    this.position.x = x
    this.position.y = y
    this.anchor.set(0.5)

  }

  async spread() {
    if(this.spreadTween) this.spreadTween.kill()
    this.spreadTween = gsap.to(this.scale, { x: 5, y: 5, duration: 1 })
    this.alphaTween = gsap.to(this, {alpha: 0, duration: 1})

    try{
      await Promise.all([this.spreadTween, this.alphaTween])
      return
    }catch(err) {
      console.log(err)
    }
  }
}