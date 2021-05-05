import { createRef, useEffect, useState } from "react"
import myContainer from './container'
import App from './app'
import gsap from 'gsap'
import createStyles from '../../../styles/modules/create/index.module.scss'
import { Texture } from 'pixi.js'
import EventManager, { Events } from '../../common/events'

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  const [container, setContainer] = useState(null)

  // 最初に一回
  useEffect(() => {
    if(mounted) return
    setMounted(true)

    targetDOM.current.appendChild(App.view)

    const _container = new myContainer()
    setContainer(_container)
    const update = () => {
      requestAnimationFrame(update)
      _container.Update()
    }
    update()
    App.stage.addChild(_container)
  }, [])

  useEffect(() => {
    // DOMのonLoadイベント受け取りたいけどめんどくさいからとりあえずsetTimeout
    setTimeout(()=>{
      resize()

      gsap.to(targetDOM.current, {alpha: 1, duration: 0.5})
    }, 1000)

    window.addEventListener("resize", resize)
  })

  function resize() {
    if(targetDOM.current) {
      App.onResize()
    }
    if(container) container.onResize()

  }

  function animationStart(){
    container.fishShouldAnimate = !container.fishShouldAnimate
  }

  function getImageData(){
    const frameCount = 8
    container.fishShouldAnimate = true
    let count = 0
    let urls = []
    const timer = setInterval(() => {
      App.renderer.render(container)
      const url = App.renderer.view.toDataURL("image/png")
      urls.push(url)
      count ++
      if(count == frameCount) {
        clearInterval(timer)
        container.fishShouldAnimate = false
        let textures = []
        for(const i in urls) {
          const texture = new Texture.from(urls[i])
          textures.push(texture)
        }
        EventManager.emit(Events.OnTextureLoad, textures)
      }
    }, Math.PI * 1000 / frameCount)

  }

  function resetShape() {
    console.log("reset shape");
    container.initCircles()
  }

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
      <div id="create_pure" className="js__pixi__create" ref={targetDOM} style={styles}></div>
      <div className={createStyles.button__wrapper}>
        <a className={createStyles.button__done} onClick={resetShape}>RESET</a>
        <a className={createStyles.button__done} onClick={animationStart}>ANIMATE</a>
        <a className={createStyles.button__done} onClick={getImageData}>DONE</a>
      </div>
    </>
  )

}