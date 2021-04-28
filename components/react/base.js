import React from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'
import gsap from 'gsap'
import Footer from './common/footer'
import EventManager, { Events } from '../common/events'

export default class _Base extends React.Component {

  constructor(props) {
    super(props)
    this.appearTween = null
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
      tasks.push(new Promise((res, rej) => {
        if(el.naturalWidth > 0 && el.complete){
          res()
        }
        else {
          el.onload = res()
          el.onerror = rej()
        }
      }))
    }
    await Promise.all(tasks)
    this.handleLoadingComplete()
  }

  // DOM要素はローディングを待ってからふわっと登場
  handleLoadingComplete() {
    // appear animation
    if(this.appearTween) this.appearTween.kill()
    this.appearTween = gsap.fromTo(this.wrapper, {opacity: 0}, {opacity: 1, duration: 0.5, delay: 0.3})

    const elements = []
    this.children(this.wrapper, (el)=>elements.push(el))
    this.elements = elements

    this.floatTween(this.elements, 10)

    EventManager.EmitEvent(Events.OnImgLoad)
  }

  /**
   * 末端の子要素を見つけてcallbackの引数に渡す
   * @param {DOM} parentDOM
   * @param {fn} callback
   */
  children (parentDOM, callback) {
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
  floatTween = (elements, range)=> {
    // moveIn animation
    if(this.moveInTweens.length) for(const i in this.moveInTweens) this.moveInTweens[i].kill()
    if(this.fallTweens.length) for(const i in this.fallTweens) this.fallTweens[i].kill()
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
        <BackgroundContextSender position={(this.props.circlePos)}/>
        <Header/>
        <div className="transition__container" ref={this.onDOMReady}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }

}