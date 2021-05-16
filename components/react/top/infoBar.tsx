import React from 'react'
import TitleList from './titleList'
import AboutLink from './aboutLink'
import styles from '../../../styles/layout/components/infoBar.module.scss'
import gsap from 'gsap'

interface Props {
  works: {
    contents: Array<{
      title: string,
      id: string
    }>
  }
  onSelectWork: Function

}

export default class InfoBar extends React.Component<Props> {

  container: HTMLElement

  constructor(props) {
    super(props)
    this.container
  }

  handleReadyContainer = (node) => {
    this.container = node
    this.container.addEventListener("mousewheel", this.handleScroll, {passive: false})
  }

  componentWillUnmount() {
    this.container.removeEventListener("mousewheel", this.handleScroll)
  }

  handleScroll = (e) => {
    if(e && e.cancelable) e.preventDefault()
  }

  handleClickAbout = ():void => {
    gsap.to(this.container, {width: window.innerWidth, duration: 1})

  }

  render () {
    return (
      <div className={styles.container} ref={this.handleReadyContainer}>
        <TitleList
          onSelectWork={this.props.onSelectWork}
          works={this.props.works}
        />
        <AboutLink
          onClickAbout={this.handleClickAbout}
        />
      </div>
    )
  }

}