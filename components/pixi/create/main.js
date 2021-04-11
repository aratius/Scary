import { createRef, useEffect, useState } from "react"
import myContainer from './container'
import App from './app'

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