import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import App from './app'
import myContainer from './container'


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
    console.log(_container)
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
      App.onResize()
      if(container) container.onResize()
    })
  })

  return (
    <div id="pure" ref={targetDOM} style={{position: "absolute", top: 0, zIndex: 100, pointerEvents: "none"}}></div>
  )

}