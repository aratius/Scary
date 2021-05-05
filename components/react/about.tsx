import React from 'react'
import baseStyles from '../../styles/modules/common/base.module.scss'
import aboutStyles from '../../styles/modules/about/index.module.scss'
import gsap from "gsap"
// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

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
  scrollPos: number  // y方向のスクロールポジション
  scrollTween: any

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
    console.log("abuot did mount");

    if(this.blocks.length == 0) return
    window.addEventListener("mousewheel", this.handleScroll)
    window.addEventListener("touchmove", this.handleScroll)

  }

  componentWillUnmount() {
    window.removeEventListener("mousewheel", this.handleScroll)
    window.removeEventListener("touchmove", this.handleScroll)
  }


  // TODO: ここにメイン処理を書くような実装に変える
  // 毎フレームやる
  // 参考は自前スクロール
  handleScroll = (e) => {
    console.log("handle about scroll")

    const element = this.searchNearElement(this.blocks)
    gsap.set(this, {scrollPos: window.pageYOffset + element.getBoundingClientRect().top})

    if(this.scrollTween) this.scrollTween.kill()
    this.scrollTween = gsap.to(window, {scrollTo: this.scrollPos, duration: 1.5, ease: "circ.inOut"})

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
        <div className={aboutStyles.info__block__wrapper} ref={node => this.blocks[0] = node}>
          <div className={aboutStyles.info__block} >
            <h2>arata matsumoto</h2>
            <br/>
          </div>
        </div>

        <div className={aboutStyles.info__block__wrapper} ref={node => this.blocks[1] = node}>
          <div className={aboutStyles.info__block}>
            <h3 className={aboutStyles.info__title} ref={this.onReadyTitle}>about me</h3>
            <p>・ 2000.11.29 (20), born in Hyogo</p>
            <p>・ front end developer / backpacker</p>
            <p>・ STARRYWORKS inc. ( full time )</p>
            <p>・ osaka univercity of arts ( currently attending )</p>
            <br/>
          </div>
        </div>

        <div className={aboutStyles.info__block__wrapper} ref={node => this.blocks[2] = node}>
          <div className={aboutStyles.info__block}>
            <h3 className={aboutStyles.info__title} ref={this.onReadyTitle}>lang</h3>
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
        </div>

      </>
    )
  }
}

export default About