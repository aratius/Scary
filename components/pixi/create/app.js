import { Application } from 'pixi.js'

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
export default App