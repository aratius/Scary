import React from 'react'
import styles from '../../../styles/layout/components/titleList.module.scss'
import gsap from 'gsap'

interface Props {
  works: {
    contents: Array<{
      title: string
    }>
  }
}

export default class TitleList extends React.Component<Props> {

  titles: HTMLElement[]
  titlePositions: number[]
  activeElementData: any
  updater: any
  scrollEndTimer: any
  scrolling: boolean

  constructor(props) {
    super(props)
    this.titles = []
    this.titlePositions = []
    this.activeElementData
    this.scrollEndTimer
    this.scrolling = true
  }

  componentDidMount() {
    this.update()
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updater)
  }

  update = ():void => {
    const topThresold = this.activeElementData.top - this.activeElementData.height * 3
    const bottomThreshold = topThresold + this.activeElementData.height * (this.titles.length+1)
    const sumItemHeight = this.activeElementData.height * this.titles.length

    if(this.titles.length > 0) {
      for(const i in this.titles) {
        const rect = this.titles[i].getBoundingClientRect();
        const dist = Math.abs(rect.top - this.activeElementData.top)

        // 自身の高さの半分より近いものをもっともactiveに近い要素としてクラスを付与
        if(dist < rect.height / 2) {
          this.titles[i].classList.add(styles.activeItem)
        }else {
          this.titles[i].classList.remove(styles.activeItem)
        }

        if(rect.top < topThresold) {
          // 上に消えて下に追加
          gsap.set(this.titles[i], {y: `+=${sumItemHeight}`})  // NOTE: 70 = コンテナのpaddingTop
        }else if (rect.bottom > bottomThreshold) {
          // 下に消えて上に追加
          gsap.set(this.titles[i], {y: `-=${sumItemHeight}`})  // NOTE: 70 = コンテナのpaddingTop
        }

        if(this.scrolling) {
          const newrect = this.titles[i].getBoundingClientRect();
          const newdist = Math.abs(newrect.top - this.activeElementData.top)
          const alpha = 1 - (newdist / 80)
          if(alpha > 0)gsap.to(this.titles[i], { alpha: alpha, duration: 0.1 })  // アニメーションする
          else gsap.set(this.titles[i], {alpha: 0})  // アニメーションせず、パチっと切り替わる アニメーションすると、上に飛び出て下に追加される要素が一瞬見切れてしまう
        }

      }

    }

    this.updater = requestAnimationFrame(this.update)
  }

  handleScroll = (e) => {
    // if(e && e.cancelable) e.preventDefault();
    // 親でpreventDefaultしているのでしなくて良い
    this.scrolling = true
    if(this.titles.length == 0) return

    for(const i in this.titles) {
      gsap.set(this.titles[i], {y: `+=${-e.deltaY/2}`})  // 文字列で+=100と書くと+=現在からの相対移動が可能
    }
    clearTimeout(this.scrollEndTimer)
    this.scrollEndTimer = setTimeout(this.handleScrollEnd, 100)
  }

  handleScrollEnd = () => {
    this.scrolling = false
    if(this.titles.length > 0) {
      for(const i in this.titles) {
        const rect = this.titles[i].getBoundingClientRect();
        const dist = Math.abs(rect.top - this.activeElementData.top)
        const alpha = 1 - (dist / 80)

        // 自身の高さの半分より近いものをもっともactiveに近い要素としてクラスを付与
        if(dist < rect.height / 2) {
          gsap.to(this.titles[i], {alpha: 1, duration: 0.2})
        } else {
          gsap.to(this.titles[i], {alpha: alpha/3, duration: 0.5})
        }

      }

    }
  }

  handleReadyItem = (node, i) => {
    this.titles[i] = node

    // 上から三番目の要素を基準として位置を記憶しておく
    if(i == 2) {
      this.activeElementData = node.getBoundingClientRect()
    }
  }

  handleClickItem = (e) => {
    this.scrolling = true
    if(e && e.cancelable) e.preventDefault()
    const el = e.target
    if (el.style.opacity < 0) return  // opacity的に見えてない状態ならクリック不可能とする
    const offset = this.activeElementData.top - el.getBoundingClientRect().top
    for(const i in this.titles) {
      gsap.to(this.titles[i], {y: `+=${offset}`, duration: 0.4, ease: "circ.out", onComplete: this.handleScrollEnd})
    }
  }

  render () {
    const works = this.props.works.contents

    return (
      <ul className={styles.container} onWheel={this.handleScroll}>
        {works.map((data, i) => {
          return (
            <li key={i} className={styles.item} onClick={this.handleClickItem} ref={node => this.handleReadyItem(node, i)}>
              {data.title.toUpperCase()}
            </li>
          )
        })}
      </ul>
    )
  }

}