import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'
import Image from 'next/image'
import gsap from 'gsap'
import Loading from './loading'
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

interface Props {
  works: {
    contents: any[]
  },
  id: string,
  changed: number
}

export default class MainView extends React.Component<Props> {

  background: HTMLElement
  scrollContent: HTMLElement
  scrollContainer: HTMLElement
  scrollTween: any
  work: any  // workを記憶する変数 変更があったかどうかを監視する
  id: string
  state: {
    loaded: number
  }

  constructor(props) {
    super(props);
    this.background
    this.scrollContent
    this.id

    this.state = {
      loaded: Date.now()
    }
  }

  componentDidUpdate() {
    // idが変わったときに一回うえまでスクロール
    if(this.id != this.props.id) {
      this.id = this.props.id
      if(this.scrollTween) this.scrollTween.kill()
      this.scrollTween = gsap.to(this.scrollContainer, {
        scrollTo: 0,
        duration: 1,
        ease: 'sine.out',
        onUpdate: this.handleScrollEnd
      })
    }

  }

  handleScroll = ():void => {
    if(!this.background || !this.scrollContent) return
    if(this.scrollTween) this.scrollTween.kill()

    this.applyAlpha()
  }

  handleScrollEnd = ():void => {
    this.applyAlpha()
  }

  handleLoadMainImage = async (node) => {
    const el = node.target
    const load = new Promise<void>((res, rej) => {
      if(el.naturalWidth > 0 && el.complete){
        res()
      }
      else {
        // NOTE: イベントはvoidを期待できない？
        // https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement
        el.onload = () => {res()}
        el.onerror = () => {rej()}
      }
    })
    load.then(() => {
      setTimeout(() => {
        console.log("load complete");
        this.setState({ loaded: Date.now() })
      }, 100);
    })
  }

  applyAlpha () {
    const scrollTop = this.scrollContent.getBoundingClientRect().top
    let alpha = (window.innerHeight - scrollTop) / window.innerHeight
    alpha = alpha > 0.8 ? 0.8 : alpha
    gsap.to(this.background, { alpha: alpha, duration: 0.2 })
  }

  render () {
    const work = this.props.works.contents.filter((data) => data.id == this.props.id)[0]


    if(!work) return <>now loading...</>  // ローディングをreturnしたい

    return (
      <div className={styles.container} onWheel={this.handleScroll} ref={node => this.scrollContainer = node}>
        <div className={styles.main_view}>
          {/* 今後canvasアニメーションに差し替える */}
          <Loading
            changed={this.props.changed}
            loaded={this.state.loaded}
          />
          <Image
            className={styles.main_view__img}
            width="1080"
            height="1080"
            src={work.main_image.url}
            alt={work.title}
            priority={true}
            onLoad={this.handleLoadMainImage}
          />
          <span className={styles.main_view__bg} ref={node => this.background = node}></span>
        </div>

        <div className={styles.work_view} ref={node => this.scrollContent = node}>
          <Work work={work} />
        </div>
      </div>
    )
  }

}