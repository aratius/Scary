import { Container, Sprite, Texture } from 'pixi.js'
import { fishSVG } from '../config'
import FishPoint from './fishPoint'
import App from './app'
import Vector2 from '../common/vector2'

export default class myContainer extends Container {

  constructor() {
    super()

    this.circles = []
    this.initCircles()

    this.mousePosition = null
    this.grabbingCircle = null
    this.lastScreenWidth = App.renderer.screen.width

    window.addEventListener('mousedown', this.onClickStart)
    window.addEventListener('mousemove', this.onClickMove)
    window.addEventListener('mouseup', this.onClickEnd)
    window.addEventListener('touchstart', this.onClickStart)
    window.addEventListener('touchmove', this.onClickMove)
    window.addEventListener('touchend', this.onClickEnd)
  }

  onClickStart = (e) =>{
    this.mousePosition = App.renderer.plugins.interaction.mouse.getLocalPosition(this)
    this.isClicking = true
    let enemy
    if(e.touches) {
      for(const i in e.touches) {
        if(!(e.touches[i] instanceof Touch)) continue
        // e.touches[i].pageY
      }
    }else {
      // つかんでいるかどうかフラグ
      let mostNearDist = 9999
      let mostNear
      for(const i in this.circles) {
        const dist = Vector2.getDist(this.circles[i].position, this.mousePosition)
        if(dist < mostNearDist) {
          mostNearDist = dist
          mostNear = this.circles[i]
        }
      }
      if(mostNearDist < 20) {
        this.grabbingCircle = mostNear
        this.grabbingCircle.position = this.mousePosition
      }
    }
  }

  onClickMove = (e) =>{
    if(!this.isClicking) return
    if(e.touches) return
    this.mousePosition = App.renderer.plugins.interaction.mouse.getLocalPosition(this)

    if(this.grabbingCircle) this.grabbingCircle.position = this.mousePosition

  }

  onClickEnd = (e) => {
    this.isClicking = false
    this.mouse = null
  }


  Update(){

  }

  onResize(){

    this.fixCircles()
  }

  initCircles(){
    const texture = Texture.from("/assets/images/pixi/circle.png")
    const parser = new DOMParser()
    const doc = parser.parseFromString(fishSVG, "text/xml")

    const rect = doc.querySelector("rect")
    const scaler = App.renderer.screen.width / rect.getAttribute("width")

    const circles = doc.querySelectorAll("circle")
    for(const i in circles) {
      if(circles[i] instanceof Function) return
      const x = parseFloat(circles[i].getAttribute("cx")) * scaler
      const y = parseFloat(circles[i].getAttribute("cy")) * scaler

      const sprite = new FishPoint(texture, x, y)
      this.addChild(sprite)
      this.circles.push(sprite)
    }
  }

  fixCircles(){
    const parser = new DOMParser()
    const doc = parser.parseFromString(fishSVG, "text/xml")

    const rect = doc.querySelector("rect")
    const scaler = App.renderer.screen.width / this.lastScreenWidth
    this.lastScreenWidth = App.renderer.screen.width
    for(const i in this.circles) {
      this.circles[i].x *= scaler
      this.circles[i].y *= scaler
    }
  }

}