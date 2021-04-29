import React, { DOMElement } from 'react'
import _Head from './common/head'
import gsap from 'gsap'
import EventManager, { Events } from '../common/events'

interface Props {
  circlePos: {
    x: number,
    y: number
  },
  title: string
}

class _Base extends React.Component<Props> {

  private fallTweens: any[]
  private moveInTweens: any[]
  private elements: HTMLElement[]
  private scrollPos: number
  private wrapper: HTMLElement

  constructor(props: any) {
    super(props)
    this.fallTweens = []
    this.moveInTweens = []
    this.elements
    this.scrollPos = 0
  }

  componentDidMount() {

    this.scrollPos = window.pageYOffset

    window.addEventListener("scroll", this.handleScroll)
    return()=>{
      window.removeEventListener("scroll", this.handleScroll)
    }
  }

  // 全ての画像のローディング
  onDOMReady = async (node) => {
    if(!node) return
    this.wrapper = node
    const images = this.wrapper.getElementsByTagName('img')
    if(!images.length) this.handleLoadingComplete()
    const tasks = []
    for(const i in images) {
      const el = images[i]
      if(!(el instanceof HTMLElement)) continue
      tasks.push(new Promise<void>((res, rej) => {
        if(el.naturalWidth > 0 && el.complete){
          res()
        }
        else {
          // NOTE: イベントはvoidを期待できない？
          // https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement
          el.onload = () => {res()}
          el.onerror = () => {rej()}
        }
      }))
    }
    await Promise.all(tasks)
    this.handleLoadingComplete()
  }

  // DOM要素はローディングを待ってからふわっと登場
  handleLoadingComplete() {

    const elements = []
    this.children(this.wrapper, (el)=>elements.push(el))
    this.elements = elements

    this.floatTween(this.elements, 10)

    EventManager.emit(Events.OnImgLoad)
  }

  /**
   * 末端の子要素を見つけてcallbackの引数に渡す
   */
  children (parentDOM: HTMLElement, callback: (DOM: HTMLElement) => void) {
    const _elements = []
    for(const i in parentDOM.children) {
      const DOM = parentDOM.children[i]
      if(!(DOM instanceof HTMLElement)) continue

      // さらに子要素を持っていれば末端ではないので再起関数にかける
      if(DOM.children.length >= 1) {
        this.children(DOM, callback)
      }else{  // 持っていなければ末端に達したということなのでcallbackで下の配列にpushする
        callback(DOM)
      }
    }
    return _elements
  }

  // 水面をふわふわ浮かんでいるようなtween
  floatTween = (elements: HTMLElement[], range: number)=> {
    // moveIn animation
    if(this.moveInTweens.length) for(const i in this.moveInTweens) this.moveInTweens[i].kill()
    if(this.fallTweens.length) for(const i in this.fallTweens) this.fallTweens[i].kill()
    console.log(typeof(this.fallTweens[0]));

    for(const i in elements){
      const dur = Math.random()*10 + 5
      const x = (Math.random()-0.5) * 2 * range + "px"
      const y = (Math.random()-1.3) * 3 * range + "px"
      this.moveInTweens[i] = gsap.fromTo(elements[i], {x: x, y: y}, {x: 0, y: 0, duration: dur, delay: 0, ease: "elastic.out(5)"})
    }
  }

  // スクローススピード早ければフロート
  handleScroll = () => {
    const currentPos = window.pageYOffset
    const scrollSpeed = Math.abs(currentPos - this.scrollPos)
    if(scrollSpeed > 500) {
      this.floatTween(this.elements, scrollSpeed / 300)
    }

    this.scrollPos = currentPos
  }

  render () {

    return (
      <div className="container">
        <_Head title={`Cocoon | ${this.props.title}`}/>
        <div ref={this.onDOMReady}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default _Base