import React from 'react'
import baseStyles from '../../styles/modules/common/base.module.scss'
import aboutStyles from '../../styles/modules/about/index.module.scss'
import gsap from "gsap"
// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)

interface Props {
  data: {
    name: string,
    name_image: {
      url: string
    }
  }
}

class About extends React.Component<Props> {

  blocks: HTMLElement[]
  scrollTimeOutTimer: any
  scrollPos: number  // y方向のスクロールポジション

  constructor(props) {
    super(props)

    this.blocks = []
    this.scrollPos = 0
  }

  // タイトルが見えたときになんかする
  onReadyTitle (node) {
    // gsap.to(node, {
    //   scrollTrigger: node,

    // })
  }

  componentDidMount() {

    if(this.blocks.length == 0) return
    window.addEventListener("mousewheel", this.handleScroll, {passive: false})
    window.addEventListener("touchmove", this.handleScroll, {passive: false})

    for(const i in this.blocks) {
      if(!(this.blocks[i] instanceof HTMLElement)) continue

    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousewheel", this.handleScroll)
    window.removeEventListener("touchmove", this.handleScroll)
  }


  // TODO: ここにメイン処理を書くような実装に変える
  // 毎フレームやる
  // 参考は自前スクロール
  handleScroll = (e) => {
    this.scrollPos = window.pageYOffset

    // const element = this.searchNearElement(this.blocks)

    clearTimeout(this.scrollTimeOutTimer)
    this.scrollTimeOutTimer = setTimeout(this.handleScrollEnd, 100)
  }

  handleScrollEnd = () => {
    const element = this.searchNearElement(this.blocks)
    if(element instanceof HTMLElement) {
      gsap.to(window, {scrollTo: element, duration: 1})
    }

  }

  searchNearElement(elements: HTMLElement[]) {
    let near = 9999
    let nearEl
    for(const i in elements) {
      const el = elements[i]
      const elPos = el.getBoundingClientRect().top
      const dist = Math.abs(elPos)
      if(dist < near) {
        near = dist
        nearEl = el
      }
    }
    return nearEl
  }

  // TODO: スクロールバー消す
  render() {

    return (
      <>
        <div className={aboutStyles.info__block} ref={node => this.blocks[0] = node}>
          <h2>arata matsumoto</h2>
          <br/>
        </div>

        <div className={aboutStyles.info__block} ref={node => this.blocks[1] = node}>
          <h3 ref={this.onReadyTitle}>about me</h3>
          <p>・ 2000.11.29 (20), born in Hyogo</p>
          <p>・ front end developer / backpacker</p>
          <p>・ STARRYWORKS inc. ( full time )</p>
          <p>・ osaka univercity of arts ( currently attending )</p>
          <br/>
        </div>

        <div className={aboutStyles.info__block} ref={node => this.blocks[2] = node}>
          <h3 ref={this.onReadyTitle}>lang</h3>
          <br/>

          <h4>javascript</h4>
          <p>・ React.js</p>
          <p>・ Next.js</p>
          <p>・ pixi.js</p>
          <p>・ three.js</p>
          <br/>

          <h4>C++</h4>
          <p>・ openframeworks</p>
          <p>・ GLSL</p>
          <p>・ Arduino</p>
          <br/>

          <h4>C#</h4>
          <p>・ Unity</p>
          <br/>
        </div>

      </>
    )
  }
}

export default About