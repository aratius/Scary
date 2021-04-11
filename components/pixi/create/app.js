import { Application } from 'pixi.js'
import gsap from 'gsap'

class _App extends Application {

  constructor(){
    super({
      backgroundColor: 0xaaaaaa,
      backgroundAlpha: 0.
    })
    this.renderer.preserveDrawingBuffer = true
  }

  // ラッパーのdivと同じ幅にする
  onResize(){
    const el = document.querySelector(".js__pixi__create")
    this.renderer.resize(el.clientWidth, el.clientWidth)
  }
}
const App = new _App()
export default App