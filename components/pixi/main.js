import { createRef, useEffect } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'

export default function Pure() {

  const stage = createRef(null)

  useEffect(() => {
    const app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      // backgroundAlpha: 0,
      backgroundColor: 0xf00000
    })
    stage.current.appendChild(app.view)
  }, [])

  return (
    <div id="pure" ref={stage}></div>
  )

}