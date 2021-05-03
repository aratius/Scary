import React from 'react'
import Link from 'next/link'
import TransitionLink from './link'
import styles from '../../../styles/modules/common/header.module.scss'

class Pages {
  static about = "about"
  static contact = "contact"
  static create = "create"
}

export default class Header extends React.Component {

  slideLine: HTMLElement
  waitTimer: any
  currentTarget: HTMLElement
  state: {
    slideLine: {
      width: number,
      left: number
    }
    current: string
  }

  constructor(props) {
    super(props)

    this.state = {
      slideLine: {
        width: 0,
        left: 0,
      },
      current: ""  // 現在のページ
    },
    this.slideLine
    this.waitTimer
    this.currentTarget
  }

  // オーバーしたところへ行く
  handleOver = (e) => {
    // タイマーあればクリアする
    if(this.waitTimer) clearTimeout(this.waitTimer)
    if(!this.slideLine) return
    this.slideToTarget(e.target)
  }

  /**
   * クリックせずにアウトしたときはcurrentに戻す
   * @param e
   */
  handleOut = (e) => {
    if(this.state.current != e.target.textContent) {
      // Link間に間があってそこにいちいち反応してゼロに行くのは良くないので300msだけ待つ
      // 新しいホバーがあればこのタイマーをクリアする
      this.waitTimer = setTimeout(() => {
        if(this.currentTarget) {
          this.slideToTarget(this.currentTarget)
        }else {
          this.slideToZero()
        }
      }, 300)
    }
  }

  /**
   * ホーム以外は更新
   * ホームの場合はステータスリセット
   * @param e
   */
  handleClick = (e) => {
    if(e.target.textContent) {
      this.currentTarget = e.target
      this.setState({current: e.target.textContent})
    } else {
      this.currentTarget = null
      this.setState({current: ""})
      this.slideToZero()
    }
  }

  // 指定のDOMのところへ
  slideToTarget = (target) => {
    this.setState({
      ...this.state,
      slideLine: {
        ...this.state.slideLine,
        width: target.clientWidth,
        left: 300 - target.getBoundingClientRect().bottom
      }
    })
  }

  // ホームのとき ゼロ位置へ
  slideToZero = () => {
    this.setState({
      ...this.state,
      slideLine: {
        ...this.state.slideLine,
        width: 0,
        left: 0
      }
    })
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <ul>
            <li onMouseOver={this.handleOver} onMouseOut={this.handleOut} onClick={this.handleClick}><TransitionLink href="/about">{Pages.about}</TransitionLink></li>
            <span>-</span>
            <li onMouseOver={this.handleOver} onMouseOut={this.handleOut} onClick={this.handleClick}><TransitionLink href="/">{Pages.contact}</TransitionLink></li>
            <span>-</span>
            <li onMouseOver={this.handleOver} onMouseOut={this.handleOut} onClick={this.handleClick}><TransitionLink href="/create">{Pages.create}</TransitionLink></li>

            <li onClick={this.handleClick}><TransitionLink href="/"><img src="/assets/images/logo.svg"/></TransitionLink></li>

            {/* スライドライン */}
            <span className={styles.slide_line} style={this.state.slideLine} ref={node => this.slideLine = node}></span>
          </ul>
        </div>
      </>
    )
  }

}