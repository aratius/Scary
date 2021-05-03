import React, { ReactNode } from 'react'
import gsap from 'gsap'
import EventManager, { Events } from '../../common/events'

interface Props {
  children: ReactNode
}

// このタグで囲うとふわふわアニメーションする
class Floating extends React.Component<Props> {

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

    EventManager.on(Events.OnImgLoad, this.handleLoadingComplete)
  }

  componentDidMount() {
    this.scrollPos = window.pageYOffset

    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  // DOM要素はローディングを待ってからふわっと登場
  handleLoadingComplete = () => {

    const elements = []
    this.searchChildren(this.wrapper, (el)=>elements.push(el))
    this.elements = elements

    this.floatTween(this.elements, 10)
  }

  /**
   * 再帰関数
   * 末端の子要素を見つけてcallbackの引数に渡す
   */
  searchChildren (parentDOM: HTMLElement, callback: (DOM: HTMLElement) => void) {
    if(!parentDOM) return
    const _elements = []
    for(const i in parentDOM.children) {
      const DOM = parentDOM.children[i]
      if(!(DOM instanceof HTMLElement)) continue

      // さらに子要素を持っていれば末端ではないので再起関数にかける
      if(DOM.children.length >= 1) {
        this.searchChildren(DOM, callback)
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
    if(scrollSpeed > 300) {
      this.floatTween(this.elements, scrollSpeed / 300)
    }

    this.scrollPos = currentPos
  }

  render () {

    return (
      <div ref={node => this.wrapper = node}>
        {this.props.children}
      </div>
    )
  }

}

export default Floating