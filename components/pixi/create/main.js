import React, { createRef, useEffect, useState } from "react"
import myContainer from './container'
import App from './app'
import gsap from 'gsap'
import createStyles from '../../../styles/modules/create/index.module.scss'
import { Texture } from 'pixi.js'
import EventManager, { Events } from '../../common/events'

export default class Pure extends React.Component {

  constructor (props) {
    super(props)

    this.container = myContainer
    App.stage.addChild(this.container)
    this.update()
  }

  onDOMReady = (node) => {
    if(!node) return
    node.appendChild(App.view)
    this.targetDOM = node
    setTimeout(()=>{
      this.resize()
      gsap.to(this.targetDOM, {alpha: 1, duration: 0.5})
    }, 1000)
  }

  componentDidUpdate () {
    // DOMのonLoadイベント受け取りたいけどめんどくさいからとりあえずsetTimeout
    setTimeout(()=>{
      resize()
      gsap.to(this.targetDOM, {alpha: 1, duration: 0.5})
    }, 1000)

    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.resize)
    cancelAnimationFrame(this.animation)
  }

  update = () => {
    this.animation = requestAnimationFrame(this.update)
    this.container.Update()
  }

  resize() {
    if(this.targetDOM) {
      App.onResize()
    }
    if(this.container) this.container.onResize()
  }

  animationStart = () => {
    this.container.fishShouldAnimate = !this.container.fishShouldAnimate
  }

  getImageData = () => {
    const frameCount = 8
    this.container.fishShouldAnimate = true
    let count = 0
    let urls = []
    // フレーム数分のパターンをsetIntervalで抽出
    const timer = setInterval(() => {
      App.renderer.render(this.container)
      const url = App.renderer.view.toDataURL("image/png")
      urls.push(url)
      count ++
      // 最後はemit
      if(count == frameCount) {
        clearInterval(timer)
        this.container.fishShouldAnimate = false
        let textures = []
        for(const i in urls) {
          const texture = new Texture.from(urls[i])
          textures.push(texture)
        }
        EventManager.emit(Events.OnTextureLoad, textures)
      }
    }, Math.PI * 1000 / frameCount)

  }

  resetShape () {
    this.container.initCircles()
  }

  render () {
    const styles = {
      position: "relative",
      width: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      pointerEvents: "none",
      backgroundColor: "gray",
      opacity: 0
    }
    return (
      <>
        <div id="create_pure" className="js__pixi__create" ref={this.onDOMReady} style={styles}></div>
        <div className={createStyles.button__wrapper}>
          <a className={createStyles.button__done} onClick={this.resetShape}>RESET</a>
          <a className={createStyles.button__done} onClick={this.animationStart}>ANIMATE</a>
          <a className={createStyles.button__done} onClick={this.getImageData}>DONE</a>
        </div>
      </>
    )
  }

}