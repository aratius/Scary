import React from 'react'
import lottie from 'lottie-web'
import styles from '../../../styles/layout/components/loading.module.scss'
import gsap from 'gsap'

interface Props {
  changed: number
  loaded: number
}

export default class Loading extends React.Component<Props> {

  lottieContainer: HTMLElement
  loadingContainer: HTMLElement
  changed: number
  loaded: number
  fadeTween: any

  constructor(props) {
    super(props)
    this.changed = 0
    this.loaded = 0
  }

  componentDidMount(){
  }

  componentDidUpdate() {
    if(this.changed != this.props.changed) {
      this.changed = this.props.changed
      this.showLoading()
    }
    if(this.loaded != this.props.loaded) {
      this.loaded = this.props.loaded
      this.hideLoading()
    }
  }

  showLoading() {
    if(this.fadeTween) this.fadeTween.kill()

    this.fadeTween = gsap.timeline()  // fade tweenのタイムライン
    this.fadeTween.to(this.loadingContainer, { alpha: 1, duration: 0 })
    console.log("show");

  }

  hideLoading() {
    // show tweenが終わってなかったとしても、最低0.3秒待ち（タイムラインなので）、その後表示される
    this.fadeTween.to(this.loadingContainer, { alpha: 0, duration: 0.5, delay: 0.3 })
    console.log("hide");

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