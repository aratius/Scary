import React from 'react'
import styles from '../../styles/layout/about.module.scss'
import Floating from './common/floating'
import gsap from "gsap"
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)
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
  scrollDeltaY: number
  scrollAmount: number
  toNearElAmount: number
  updater: any                  // cancelAnimationFrameのための名前
  scrollTimer: any              // scrollEndを取るためのtimer
  stopAgainstWarp: boolean      // まず一番下まで見切るまでは逆方向のスクロールワープを禁止する

  constructor(props) {
    super(props)

    this.blocks = []
    this.scrollDeltaY = 0
    this.scrollAmount = 0
    this.toNearElAmount = 0
    this.stopAgainstWarp = true
  }

  // タイトルが見えたときになんかする
  onReadyTitle (node) {
  }

  componentDidMount() {
    window.addEventListener("wheel", this.handleScroll, {passive: false})
    window.addEventListener("touchmove", this.handleScroll, {passive: false})
    this.stopAgainstWarp = true
    window.scrollTo(0, 0)
    this.update()
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll)
    window.removeEventListener("touchmove", this.handleScroll)
    cancelAnimationFrame(this.updater)
  }

  update = ():void => {
    // スクロールする力
    this.scrollAmount += this.scrollDeltaY
    this.scrollAmount *= 0.95
    const scrollAmout = this.scrollAmount * 0.01

    // 近い要素へ向かう力
    const nearEl = this.searchNearElement(this.blocks)
    const nearElDist = nearEl.getBoundingClientRect().top
    this.toNearElAmount += nearElDist // 近い要素へ向かう力
    this.toNearElAmount *= 0.6
    const toNearElAmount = this.toNearElAmount * 0.01

    const scrollTo = scrollAmout + toNearElAmount
    gsap.set(window, { scrollTo: `+=${scrollTo}` })

    /**
     * スクロールワープ
     */
    if(scrollTo > 0 && window.scrollY == document.body.clientHeight - window.innerHeight) {
      // 順方向ワープ
      window.scrollTo(0, 0)
    }else if(scrollTo < 0 && window.scrollY == 0) {
      // 逆方向ワープ
      window.scrollTo(0, document.body.clientHeight - window.innerHeight)
    }

    this.updater = requestAnimationFrame(this.update)
  }


  // TODO: ここにメイン処理を書くような実装に変える
  // 毎フレームやる
  // 参考は自前スクロール
  handleScroll = (e): void => {
    if(e) e.preventDefault()

    this.scrollDeltaY = e.deltaY

    clearTimeout(this.scrollTimer)
    this.scrollTimer = setTimeout(this.handleScrollEnd, 100)
  }

  handleScrollEnd = ():void => {
    gsap.to(this, {scrollDeltaY: 0, duration: 0.1, ease: "sine.out"})  // スクロールする力をtweenで消滅させる scrollイベントは途中で終わっちゃうので
  }

  /**
   * 近い要素を探す
   * @param elements
   * @returns
   */
  searchNearElement(elements: HTMLElement[]): HTMLElement {
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

  handleReadyElement = (node: HTMLElement):void => {
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

    const duplicateElement = (i: number) => (
      <div className={styles.info__block__wrapper} ref={node => this.blocks[i] = node}>
        <div className={styles.info__block} >
          <h1 className={i!=0 && styles.ignore}>arata matsumoto</h1>
        </div>
      </div>
    )

    return (
      <Floating
        onReadyElement={this.handleReadyElement}
      >
        <div className={styles.container}>

          {duplicateElement(0)}

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

          <div className={styles.info__block__wrapper} ref={node => this.blocks[3] = node}>
            <div className={styles.info__block}>
              <h3 className={styles.info__title} ref={this.onReadyTitle}><span>contact</span></h3>

              <ul>
                <li>
                  <a href="mailto:arata1129matsu@icloud.com"className={styles.text} onClick={():void=>alert("Let me start the mailer")}>mail: arata1129matsu@icloud.com</a>
                </li>
                <li><a href="https://twitter.com/aualrxse" target="_blank">twitter: @aualrxse</a></li>
                <li><a href="https://www.instagram.com/aualrxse/" target="_blank">instagram: @aualrxse</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=100064373851983" target="_blank">facebook: @aualrxse</a></li>
              </ul>

            </div>
          </div>

          {duplicateElement(4)}

        </div>
      </Floating>
    )
  }
}

export default About