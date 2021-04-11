import { Application } from 'pixi.js'

class _App extends Application {

  constructor(){
    const el = document.querySelector('.js__pixi__height')
    const height = el.clientHeight > window.innerHeight ? el.clientHeight : window.innerHeight  //最低でもwindow.innerHeihgtは担保
    super({
      width: document.documentElement.clientWidth,
      height: height,
      backgroundAlpha: 0.,
      backgroundColor: 0x000000
    })
    this.stage.interactive = true;
    this.renderer.autoResize = true

  }

  onResize = (e) => {
    const el = document.querySelector('.js__pixi__height')
    const height = el.clientHeight > window.innerHeight ? el.clientHeight : window.innerHeight  //最低でもwindow.innerHeihgtは担保
    this.renderer.resize(document.documentElement.clientWidth, height)
  }

}

const App = new _App()
export default App
// single ton