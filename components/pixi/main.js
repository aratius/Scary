import { createRef, useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'

export default function Pure() {

  const stage = createRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if(mounted) return

    const app = new Application({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight,
      // backgroundAlpha: 0,
      // backgroundColor: 0xf00000
    })
    stage.current.appendChild(app.view)

    setMounted(true)
  }, [])

  return (
    <div id="pure" ref={stage}></div>
  )

}