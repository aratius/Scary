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

  constructor(props) {
    super(props)
    this.container
  }

  handleReadyContainer = (node) => {
    if(!node) return
    this.container = node
    this.container.addEventListener("mousewheel", this.handleScroll, {passive: false})
    this.container.addEventListener("touchmove", this.handleScroll, {passive: false})
  }

  componentWillUnmount() {
    this.container.removeEventListener("mousewheel", this.handleScroll)
    this.container.removeEventListener("touchmove", this.handleScroll)
  }

  handleScroll = (e) => {
    if(e && e.cancelable) e.preventDefault()
  }

  handleClickAbout = ():void => {
    gsap.to(this.bgWhite, {width: window.innerWidth, duration: 1, ease: "expo.out"})
    gsap.to(this.container, {alpha: 0, duration: 1, onComplete: ()=>{
      router.push("/about")
    }})
  }

  render () {
    return (
      <>
        {/* ページ遷移のときに広がっていく背景白 */}
        <span className={styles.bgWhite} ref={node => this.bgWhite = node}></span>
        <div className={styles.container} ref={this.handleReadyContainer}>
          <span className={styles.open_close__btn}></span>
          <TitleList
            onSelectWork={this.props.onSelectWork}
            onChangeWork={this.props.onChangeWork}
            works={this.props.works}
          />
          <AboutLink
            onClickAbout={this.handleClickAbout}
          />
        </div>
      </>
    )
  }

}