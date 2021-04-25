import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import App from './app'
import myContainer from './container'

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if(mounted) return
    setMounted(true)

    targetDOM.current.appendChild(App.view)
    App.stage.addChild(myContainer)

    update()

    window.addEventListener("resize", handleResize)
    // 実際のDOMのonload取るの大変だからsetIntervalで一定時間ごとにちゃんとできているか確認する
    // setInterval(() => {
    //   handleResize();
    // }, 1000);
    handleResize();

  }, [])

  const handleResize = () => {
    App.onResize()
    if(myContainer) myContainer.onResize()
  }

  const update = () => {
    myContainer.Update()
    requestAnimationFrame(update)
  }

  return (
    <div id="pure" ref={targetDOM} style={{position: "absolute", top: 0, zIndex: 100, pointerEvents: "none"}}></div>
  )

}