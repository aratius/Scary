
import React from 'react'
import lottie from 'lottie-web'
import styles from '../../../styles/layout/components/notifier.module.scss'
import gsap from 'gsap'

interface Props {
  isHide: boolean
}

/**
 * スクロール補助UI
 * 最初に一回消したらリロードするまで表示しない
 */
export default class ScrollNotifier extends React.Component<Props> {
  lottieContainer: HTMLElement

  handleReadyNotifierContainer = (node) => {
    this.lottieContainer = node
    lottie.loadAnimation({
      container: this.lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/images/scrollNotifier.json"
    })
  }

  hide() {
    console.log("hide as");

    gsap.to(this.lottieContainer, {alpha: 0,scale: 0, duration: 0.1, ease: "back.in(1)"})
  }

  render() {
    if(this.props.isHide) return(<></>)
    return(
      <div className={styles.container}>
        <div ref={this.handleReadyNotifierContainer} className={styles.notifier}>
        </div>
      </div>
    )
  }

}