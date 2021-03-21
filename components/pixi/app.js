import { Application } from 'pixi.js'

class _App extends Application {

  constructor(){
    const el = document.querySelector('.js__pixi__height')
    console.log(el)
    super({
      width: document.documentElement.clientWidth,
      height: el.clientHeight,
      backgroundAlpha: 0.,
      backgroundColor: 0x000000
    })
    this.renderer.autoResize = true

    window.addEventListener('resize', this.onResize)

  }

  onResize = (e) => {
    console.log("resize")
    const el = document.querySelector('.js__pixi__height')
    console.log(el)
    this.renderer.resize(document.documentElement.clientWidth, el.clientHeight)
  }

}

const App = new _App()
export default App
// single ton