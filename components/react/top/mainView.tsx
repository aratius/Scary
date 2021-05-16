import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'
import gsap from 'gsap'
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
  state: {
    work: any
  }

  constructor(props) {
    super(props);
    this.background
    this.scrollContent
  }

  handleReadyBg = (node):void => {
    this.background = node
  }

  handleReadyScrollContent = (node):void => {
    this.scrollContent = node
  }

  handleScroll = (e):void => {
    if(!this.background || !this.scrollContent) return

    const scrollTop = this.scrollContent.getBoundingClientRect().top
    let alpha = (window.innerHeight - scrollTop) / window.innerHeight
    alpha = alpha > 0.8 ? 0.8 : alpha
    gsap.to(this.background, { alpha: alpha, duration: 0.2 })

  }

  render () {
    const work = this.props.works.contents.filter((data) => data.id == this.props.id)[0]

    if(!work) return <></>

    return (
      <div className={styles.container} onWheel={this.handleScroll}>
        <div className={styles.main_view}>
          {/* 今後canvasアニメーションに差し替える */}
          <img src={work.main_image.url}/>
          <span className={styles.main_view__bg} ref={this.handleReadyBg}></span>
        </div>

        <div className={styles.work_view} ref={this.handleReadyScrollContent}>
          <Work work={work} />
        </div>
      </div>
    )
  }

}