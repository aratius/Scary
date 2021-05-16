import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'
import gsap from 'gsap'
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

interface Props {
  works: {
    contents: any[]
  },
  id: string
}

export default class MainView extends React.Component<Props> {

  background: HTMLElement
  scrollContent: HTMLElement
  scrollContainer: HTMLElement
  work: any  // workを記憶する変数 変更があったかどうかを監視する
  id: string
  state: {
    work: any
  }

  constructor(props) {
    super(props);
    this.background
    this.scrollContent
    this.id
  }

  componentDidUpdate() {

    // idが変わったときに一回下までスクロール
    if(this.id != this.props.id) {
      this.id = this.props.id
      gsap.to(this.scrollContainer, {
        scrollTo: 0,
        duration: 1,
        ease: 'circ.out'
      })
    }
  }

  handleScroll = ():void => {
    if(!this.background || !this.scrollContent) return

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
          <img src={work.main_image.url}/>
          <span className={styles.main_view__bg} ref={node => this.background = node}></span>
        </div>

        <div className={styles.work_view} ref={node => this.scrollContent = node}>
          <Work work={work} />
        </div>
      </div>
    )
  }

}