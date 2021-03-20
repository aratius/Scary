import { Application } from 'pixi.js'

class _App extends Application {

  constructor(){
    super({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight,
      backgroundAlpha: 0.3,
      backgroundColor: 0xf0f000
    })
  }

}

const App = new _App()
export default App
// single ton