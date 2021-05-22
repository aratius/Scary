import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'
import Image from 'next/image'
import Loading from './loading'
import { loadingEvent } from './loading'
import gsap from 'gsap'
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

interface Props {
  works: {
    contents: any[]
  },
  id: string,
  loaded: number,
  changed: number
}

export default class MainView extends React.Component<Props> {

  background: HTMLElement
  scrollContent: HTMLElement
  scrollContainer: HTMLElement
  scrollTween: any
  work: any  // workを記憶する変数 変更があったかどうかを監視する
  id: string
  loaded: number
  changed: number

  constructor(props) {
    super(props);
    this.background
    this.scrollContent
    this.id
    this.loaded
    this.changed

  }

  componentDidUpdate() {
    // idが変わったときに一回うえまでスクロール
    if(this.id != this.props.id) {
      this.id = this.props.id
      this.loaded = this.props.loaded
      if(this.scrollTween) this.scrollTween.kill()
      this.scrollTween = gsap.to(this.scrollContainer, {
        scrollTo: 0,
        duration: 1,
        ease: 'sine.out',
        onUpdate: this.handleScrollEnd
      })
    }else if(this.id == this.props.id){
      // スクロールした結果同じ画像に戻ってきた場合
      if(this.loaded != this.props.loaded) {
        this.endLoading()
      }
    }
    if(this.changed != this.props.changed) {
      this.changed = this.props.changed
      // ローディング開始
      this.startLoading()
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

  /**
   * メイン画像が変わるごとに画像のロードが走り、終わるとローディングを隠す
   * @param node
   */
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
      // ローディング完了
      this.endLoading();
    })
  }

  startLoading() {
    loadingEvent.emit(loadingEvent.onSelectStart);
  }

  endLoading() {
    loadingEvent.emit(loadingEvent.onImageLoad)
  }

  // 背景の黒をフェードさせる
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
          <Loading />
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