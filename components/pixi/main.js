import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import myContainer from './container'

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if(mounted) return
    setMounted(true)

    const app = new Application({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight,
      backgroundAlpha: 0.3,
      backgroundColor: 0xf0a000
    })
    targetDOM.current.appendChild(app.view)

    const container = new myContainer()
    container.Init()
    const update = () => {
      requestAnimationFrame(update)
      container.Update()
    }
    update()
    app.stage.addChild(container)
  }, [])

  return (
    <div id="pure" ref={targetDOM}></div>
  )

}