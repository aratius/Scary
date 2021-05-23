import React from 'react'
import TitleList from './titleList'
import AboutLink from './aboutLink'
import styles from '../../../styles/layout/components/infoBar.module.scss'
import gsap from 'gsap'
import router from 'next/router'

interface Props {
  works: {
    contents: Array<{
      title: string,
      id: string
    }>
  }
  onSelectWork: Function
  onChangeWork: Function
}

export default class InfoBar extends React.Component<Props> {

  container: HTMLElement
  bgWhite: HTMLElement
  isClosing: boolean

  constructor(props) {
    super(props)
    this.container
    this.isClosing = false
  }

  handleReadyContainer = (node) => {
    if(!node) return
    this.container = node
    this.container.addEventListener("mousewheel", this.handleScroll, {passive: false})
    this.container.addEventListener("touchmove", this.handleScroll, {passive: false})
  }

  componentDidMount() {
    // NOTE: CSSバグ対策 どうか？
    setTimeout(() => {
      this.container.classList.add(styles.animate)
    }, 1000)
  }

  componentWillUnmount() {
    this.container.removeEventListener("mousewheel", this.handleScroll)
    this.container.removeEventListener("touchmove", this.handleScroll)
  }

  handleScroll = (e) => {
    if(e && e.cancelable) e.preventDefault()
  }

  // シームレス風に遷移する tween tweenのonCompleteでルーティング実行
  handleClickAbout = ():void => {
    gsap.to(this.bgWhite, {width: window.innerWidth, duration: 0.7, ease: "expo.out"})
    gsap.to(this.container, {width: window.innerWidth, alpha: 0, duration: 0.7, ease: "expo.out", onComplete: ()=>{
      router.push("/about")
    }})
  }

  handleClickCloseBtn = ():void => {
    if(this.isClosing) {
      this.container.classList.remove(styles.close)
      this.bgWhite.classList.remove(styles.close)
    } else {
      this.container.classList.add(styles.close)
      this.bgWhite.classList.add(styles.close)
    }
    this.isClosing = !this.isClosing
  }

  render () {
    return (
      <>
        {/* ページ遷移のときに広がっていく背景白 */}
        <span className={styles.bgWhite} ref={node => this.bgWhite = node}></span>
        <div className={styles.container} ref={this.handleReadyContainer}>
          <span className={styles.open_close__btn} onTouchEnd={this.handleClickCloseBtn} onClick={this.handleClickCloseBtn}></span>
          <div className={styles.hide_content}>
            <TitleList
              onSelectWork={this.props.onSelectWork}
              onChangeWork={this.props.onChangeWork}
              works={this.props.works}
            />
            <AboutLink
              onClickAbout={this.handleClickAbout}
            />
          </div>
        </div>
      </>
    )
  }

}