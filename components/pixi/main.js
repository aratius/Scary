import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import App from './app'
import myContainer from './container'

export default function Pure() {

  const targetDOM = createRef(null)
  const [mounted, setMounted] = useState(false)

  function handleResize() {
    App.onResize()
    if(myContainer) myContainer.onResize()
  }

  useEffect(() => {
    if(mounted) return
    setMounted(true)

    targetDOM.current.appendChild(App.view)

    const update = () => {
      myContainer.Update()
      requestAnimationFrame(update)
    }
    update()
    App.stage.addChild(myContainer)

    window.addEventListener("resize", handleResize)
    handleResize();

    // 実際のDOMのonload取るの大変だからsetIntervalで一定時間ごとにちゃんとできているか確認する
    setInterval(() => {
      handleResize();
    }, 1000);
  }, [])

  return (
    <div id="pure" ref={targetDOM} style={{position: "absolute", top: 0, zIndex: 100, pointerEvents: "none"}}></div>
  )

}