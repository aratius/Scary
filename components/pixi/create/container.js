import { Container, Graphics, Sprite, Texture } from 'pixi.js'
import { fishSVG } from '../config'
import FishPoint from './fishPoint'
import FishBones from './fishBone'
import App from './app'
import Vector2 from '../common/vector2'

export default class myContainer extends Container {

  constructor() {
    super()

    this.circles = []
    this.fishCircles = []
    this.bones
    this.mousePosition = null
    this.wantsToHiddenContainer = new Container()
    this.addChild(this.wantsToHiddenContainer)
    this.grabbingCircle = null
    this.lastScreenWidth = App.renderer.screen.width
    this.fillGraphic = null
    this.initCircles()

    this.startTime = new Date().getTime()
    this.fishShouldAnimate = false

    window.addEventListener('mousedown', this.onClickStart)
    window.addEventListener('mousemove', this.onClickMove)
    window.addEventListener('mouseup', this.onClickEnd)
    window.addEventListener('touchstart', this.onClickStart)
    window.addEventListener('touchmove', this.onClickMove)
    window.addEventListener('touchend', this.onClickEnd)

    this.sortableChildren = true;
  }

  onClickStart = (e) =>{
    if(this.fishShouldAnimate) return

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
        if(this.grabbingCircle.defaultPosition) this.grabbingCircle.defaultPosition = this.mousePosition
      }
    }
  }

  onClickMove = (e) =>{
    e.preventDefault()
    if(!this.isClicking || this.fishShouldAnimate) return

    if(this.grabbingCircle) {
      this.grabbingCircle.position = this.mousePosition
      if(this.grabbingCircle.defaultPosition) this.grabbingCircle.defaultPosition = this.mousePosition

      this.updatePath()
    }

  }

  onClickEnd = (e) => {
    this.isClicking = false
    this.grabbingCircle = null
  }


  Update(){
    this.mousePosition = App.renderer.plugins.interaction.mouse.getLocalPosition(this)

    // マウスが中にいる かつ notアニメーション中 のときだけcircle表示
    const isInside = this.mousePosition.x > 0 && this.mousePosition.x < App.renderer.screen.width && this.mousePosition.y > 0 && this.mousePosition.y < App.renderer.screen.height
    this.wantsToHiddenContainer.alpha = isInside && !this.fishShouldAnimate ? 1 : 0

    this.fishAnimation()
  }

  onResize(){
    this.fixCircles()
  }

  initCircles(){
    const texture = Texture.from("/assets/images/pixi/circle.png")

    // svgをパースして魚の初期状態を設定
    const parser = new DOMParser()
    const doc = parser.parseFromString(fishSVG, "text/xml")

    const rect = doc.querySelector("rect")
    const scaler = App.renderer.screen.width / rect.getAttribute("width")

    const circles = doc.querySelectorAll(".fish_body")
    for(const i in circles) {
      if(circles[i] instanceof Function) break
      const x = parseFloat(circles[i].getAttribute("cx")) * scaler
      const y = parseFloat(circles[i].getAttribute("cy")) * scaler

      const sprite = new FishPoint(texture, x, y)
      this.wantsToHiddenContainer.addChild(sprite)
      this.circles.push(sprite)
      this.fishCircles.push(sprite)
    }

    // こっからは骨
    const bones = doc.querySelectorAll(".fish_bone")
    const headX = parseFloat(bones[0].getAttribute("cx")) * scaler
    const headY = parseFloat(bones[0].getAttribute("cy")) * scaler
    const middleX = parseFloat(bones[1].getAttribute("cx")) * scaler
    const middleY = parseFloat(bones[1].getAttribute("cy")) * scaler
    const tailX = parseFloat(bones[2].getAttribute("cx")) * scaler
    const tailY = parseFloat(bones[2].getAttribute("cy")) * scaler

    this.bones = new FishBones(texture, new Vector2(headX, headY), new Vector2(middleX, middleY), new Vector2(tailX, tailY))
    this.circles.push(this.bones.head)
    this.wantsToHiddenContainer.addChild(this.bones.head)
    this.circles.push(this.bones.middle)
    this.wantsToHiddenContainer.addChild(this.bones.middle)
    this.circles.push(this.bones.tail)
    this.wantsToHiddenContainer.addChild(this.bones.tail)

    this.updatePath()
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
      if(this.circles[i].defaultPosition){
        this.circles[i].defaultPosition.x *= scaler
        this.circles[i].defaultPosition.y *= scaler
      }
    }

    this.updatePath()
  }

  updatePath() {

    if(this.fillGraphic) this.fillGraphic.clear()
    const gOutline = new Graphics().beginFill(0x333333, 1).lineStyle(0, 0x333333).moveTo(this.fishCircles[0].x, this.fishCircles[0].y)
    gOutline.zIndex = -1

    for(const i in this.fishCircles) {
      const next = i == this.fishCircles.length-1 ? 0 : Number(i)+1
      gOutline.lineTo(this.fishCircles[next].x, this.fishCircles[next].y)
    }

    this.addChild(gOutline)
    this.fillGraphic = gOutline

    // Boneの描画
    if(this.boneGraphic) this.boneGraphic.clear()
    const gBone = new Graphics().lineStyle(2, 0xff3333).moveTo(this.bones.head.position.x, this.bones.head.position.y)
      .lineTo(this.bones.middle.position.x, this.bones.middle.position.y)
      .lineTo(this.bones.tail.position.x, this.bones.tail.position.y)
    this.wantsToHiddenContainer.addChild(gBone)
    this.boneGraphic = gBone
  }

  fishAnimation(){
    let time = (new Date().getTime() - this.startTime)/500
    if(!this.fishShouldAnimate) time = 0
    for(const i in this.circles) {
      const c = this.circles[i]
      const m = this.bones.middle
      const radian = Math.atan2(c.defaultPosition.x - m.position.x, c.defaultPosition.y - m.position.y)
      const dist = Math.sqrt(Math.pow(c.defaultPosition.x - m.position.x, 2) + Math.pow(c.defaultPosition.y - m.position.y, 2))

      let offset = Math.sin(time) * (dist/500)  //変化量
      // 尻尾側は逆回転
      if(Math.abs(radian) % Math.PI*2 > Math.PI) {
        offset *= -1
      }

      const y = Math.cos(radian + offset) * dist
      const x = Math.sin(radian + offset) * dist
      const position = new Vector2(x + m.x, y + m.y)
      this.circles[i].position = position
    }
    // console.log(this.fishCircles[0].position);
    this.updatePath()

  }

}