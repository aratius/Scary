import { createRef, useEffect, useState } from "react"
import myContainer from './container'
import App from './app'
import gsap from 'gsap'
import createStyles from '../../../styles/modules/create/index.module.scss'

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
    console.log("resize");
    if(targetDOM.current) {
      App.onResize()
    }
    if(container) container.onResize()

  }

  function animationStart(){
    console.log("getIMagedaa");
    const url = App.renderer.view.toDataURL("image/jpg")
    container.fishShouldAnimate = !container.fishShouldAnimate
  }

  function getImageData(){}

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
        <a className={createStyles.button__done} onClick={animationStart}>ANIMATE</a>
        <a className={createStyles.button__done} onClick={getImageData}>DONE</a>
      </div>
    </>
  )

}