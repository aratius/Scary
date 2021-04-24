import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import App from './app'
import myContainer from './container'

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  let container = null;  // こいつの変更を監視する必要はないのでただの変数に

  useEffect(() => {
    if(mounted) return
    setMounted(true)

    targetDOM.current.appendChild(App.view)

    const _container = new myContainer()
    container = _container
    const update = () => {
      _container.Update()
      requestAnimationFrame(update)
    }
    update()
    App.stage.addChild(_container)

    window.addEventListener("resize", ()=> {
      App.onResize()
      if(container) container.onResize()
    })
  }, [])

  useEffect(() => {
    // DOMのonLoadイベント受け取りたいけどめんどくさいからとりあえずsetTimeout
    setTimeout(()=>{
      App.onResize()
      if(container) container.onResize()
    }, 100)
  })

  return (
    <div id="pure" ref={targetDOM} style={{position: "absolute", top: 0, zIndex: 100, pointerEvents: "none"}}></div>
  )

}