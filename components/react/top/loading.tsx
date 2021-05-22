import React from 'react'
import lottie from 'lottie-web'
import styles from '../../../styles/layout/components/loading.module.scss'
import gsap from 'gsap'
import EventEmitter from 'events'

interface Props {
}

export default class Loading extends React.Component<Props> {

  lottieContainer: HTMLElement
  loadingContainer: HTMLElement
  fadeTween: any

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    loadingEvent.on(loadingEvent.onSelectStart, this.showLoading)
    loadingEvent.on(loadingEvent.onImageLoad, this.hideLoading)
  }

  componentDidUpdate() {
  }

  showLoading = () => {
    console.log("show")
    if(this.fadeTween) this.fadeTween.kill()

    this.fadeTween = gsap.timeline()  // fade tweenのタイムライン
    this.fadeTween.to(this.loadingContainer, { alpha: 1, duration: 0 })
  }

  /**
   * timeline.toするの自体をsetTimeoutする
   * 即timeline.toのdelay(...)ではいけない
   */
  hideLoading = () => {
    // show tweenが終わってなかったとしても、最低0.3秒待ち（タイムラインなので）、その後表示される
    if(this.fadeTween) {
      console.log("hide")
      this.fadeTween.to(this.loadingContainer, { alpha: 0, duration: 0.5, delay: 0.3 })
    }
  }

  handleReadyLottieContainer = (node) => {
    this.lottieContainer = node
    lottie.loadAnimation({
      container: this.lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/images/loading.json"
    })
  }

  render() {
    return(
      <div className={styles.container} ref={node => this.loadingContainer = node}>
        <div ref={this.handleReadyLottieContainer} className={styles.loading}>
        </div>
      </div>
    )
  }

}

class LoadingEvent extends EventEmitter {

  onImageLoad:string = "onstartloading"
  onSelectStart:string = "oncompleteloading"

}

export const loadingEvent = new LoadingEvent()