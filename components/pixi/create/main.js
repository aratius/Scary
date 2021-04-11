import { createRef, useEffect, useState } from "react"
import { Application } from 'pixi.js'
import myContainer from './container'

class _App extends Application {

  constructor(){
    super({
      backgroundColor: 0xaaaaaa,
      backgroundAlpha: 0.9
    })
  }

  // ラッパーのdivと同じ幅にする
  onResize(){
    const el = document.querySelector(".js__pixi__create")
    this.renderer.resize(el.clientWidth, el.clientWidth)
  }
}
const App = new _App()

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  const [container, setContainer] = useState(null)

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
      App.onResize()
      if(container) container.onResize()
    }, 200)

    window.addEventListener("resize", ()=> {
      if(targetDOM.current) {
        App.onResize()
      }
      if(container) container.onResize()
    })
  })

  const styles = {
    position: "relative",
    top: 100,
    width: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    pointerEvents: "none"
  }

  return (
    <div id="create_pure" className="js__pixi__create" ref={targetDOM} style={styles}></div>
  )

}