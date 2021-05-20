import React from 'react'
import styles from '../../styles/layout/about.module.scss'
import gsap from "gsap"
import Floating from './common/floating'

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
  }

  componentDidMount() {
    window.addEventListener("wheel", this.handleScroll)
    window.addEventListener("touchmove", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll)
    window.removeEventListener("touchmove", this.handleScroll)
  }


  // TODO: ここにメイン処理を書くような実装に変える
  // 毎フレームやる
  // 参考は自前スクロール
  handleScroll = (e) => {
    const element = this.searchNearElement(this.blocks)
    gsap.set(this, {scrollPos: window.pageYOffset + element.getBoundingClientRect().top})
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

  handleReadyElement = (node):void => {
    gsap.to(window, {
      scrollTrigger: {
        trigger: node,
        start: "top bottom",
        onEnter: () => {
          node.classList.add(styles.show)
        }
      }
    })

  }

  // TODO: スクロールバー消す
  render() {

    return (
      <Floating
        onReadyElement={this.handleReadyElement}
      >
        <div className={styles.container}>
          <div className={styles.info__block__wrapper} ref={node => this.blocks[0] = node}>
            <div className={styles.info__block} >
              <h1>arata matsumoto</h1>
            </div>
          </div>

          <div className={styles.info__block__wrapper} ref={node => this.blocks[1] = node}>
            <div className={styles.info__block}>
              <h3 className={styles.info__title} ref={this.onReadyTitle}><span>about me</span></h3>
              <ul>
                <li><span>・ 2000.11.29 (20), born in Hyogo</span></li>
                <li><span>・ front end developer / backpacker (sometime...)</span></li>
                <li><span>・ STARRYWORKS inc.</span></li>
                <li><span>・ osaka univercity of arts ( currently attending )</span></li>
              </ul>
              <br/>
            </div>
          </div>

          <div className={styles.info__block__wrapper} ref={node => this.blocks[2] = node}>
            <div className={styles.info__block}>
              <h3 className={styles.info__title} ref={this.onReadyTitle}><span>what i am learning</span></h3>

              <h4>HTML / CSS</h4>
              <ul>
                <li><span>・ pug (jade)</span></li>
                <li><span>・ sass (scss)</span></li>
              </ul>

              <h4>javascript</h4>
              <ul>
                <li><span>・ Next.js (React.js)</span></li>
                <li><span>・ pixi.js</span></li>
                <li><span>・ three.js</span></li>
              </ul>

              <h4>C++</h4>
              <ul>
                <li><span>・ openframeworks</span></li>
                <li><span>・ GLSL</span></li>
                <li><span>・ Arduino</span></li>
              </ul>

              <h4>C#</h4>
              <ul>
                <li><span>・ Unity</span></li>
              </ul>

            </div>
          </div>

          <div className={styles.info__block__wrapper} ref={node => this.blocks[2] = node}>
            <div className={styles.info__block}>
              <h3 className={styles.info__title} ref={this.onReadyTitle}><span>contact</span></h3>

              <ul>
                <li>
                  <a href="mailto:arata1129matsu@icloud.com"className={styles.text} onClick={():void=>alert("Let me start the mailer")}>mail: arata1129matsu@icloud.com</a>
                </li>
                <li><span>twitter: @aualrxse</span></li>
                <li><span>instagram: @aualrxse</span></li>
                <li><span>facebook: @aualrxse</span></li>
              </ul>

            </div>
          </div>
        </div>
      </Floating>
    )
  }
}

export default About