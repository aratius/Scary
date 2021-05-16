import React from 'react'
import styles from '../../../styles/layout/components/titleList.module.scss'
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

export default class TitleList extends React.Component<Props> {

  titles: HTMLElement[]
  titlePositions: number[]
  activeElementData: any
  activeId: string
  updater: any
  scrollEndTimer: any
  scrolling: boolean

  constructor(props) {
    super(props)
    this.titles = []
    this.titlePositions = []
    this.activeElementData  // アクティブな要素の情報 最初に一度決定されて、その後は変わることはない 別の要素に映ることもない 値としてアクティブな要素はここにいるべきですよというのを保持するだけ
    this.activeId  // アクティブ要素のid propsのイベントを発火するときに渡す この値は都度変更される
    this.scrollEndTimer
    this.scrolling = true

    this.state = {
      hoge: "h"
    }
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
          this.activeId = this.titles[i].id
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

        const newrect = this.titles[i].getBoundingClientRect();
        const newdist = Math.abs(newrect.top - this.activeElementData.top)
        let alpha = 1 - (newdist / 80)
        // もっとも近いもの以外は結構薄くする
        alpha = newdist < newrect.height / 2 ? 1 : alpha / 2
        if(alpha > 0)gsap.to(this.titles[i], { alpha: alpha, duration: 0.1 })  // アニメーションする
        else gsap.set(this.titles[i], {alpha: 0})  // アニメーションせず、パチっと切り替わる アニメーションすると、上に飛び出て下に追加される要素が一瞬見切れてしまう
      }
    }

    this.updater = requestAnimationFrame(this.update)
  }

  handleScroll = (e) => {
    // if(e && e.cancelable) e.preventDefault();
    // 親でpreventDefaultしているのでしなくて良い
    this.scrolling = true
    if(this.titles.length == 0) return

    const scrollY = Math.abs(e.deltaY) > 60 ? -60/3 : -e.deltaY/3  // e.deltaYを扱いやすい数字に調整
    for(const i in this.titles) {
      gsap.set(this.titles[i], {y: `+=${scrollY}`})  // 文字列で+=100と書くと+=現在からの相対移動が可能
    }
    clearTimeout(this.scrollEndTimer)
    this.scrollEndTimer = setTimeout(this.handleScrollEnd, 100)
  }

  handleScrollEnd = () => {
    this.props.onSelectWork(this.activeId)
  }

  handleReadyItem = (node, i) => {
    if(!node) return
    this.titles[i] = node

    // 上から三番目の要素を基準として位置を記憶しておく
    if(i == 2) {
      if(!this.activeElementData) {  // これは最初のマウント時に一回のみで良い
        this.activeElementData = node.getBoundingClientRect()
        this.activeId = node.id
      }
    }
  }

  handleClickItem = (e) => {
    if(e && e.cancelable) e.preventDefault()
    const el = e.target
    // opacity的に見えてない状態ならクリック不可能とする
    if (el.style.opacity < 0) {
      this.handleScrollEnd()
      return
    }
    const offset = this.activeElementData.top - el.getBoundingClientRect().top
    for(const i in this.titles) {
      gsap.to(this.titles[i], {y: `+=${offset}`, duration: 0.4, ease: "circ.out"})
    }
  }

  render () {
    const works = this.props.works.contents

    return (
      <ul className={styles.container} onWheel={this.handleScroll}>
        {works.map((data, i) => {
          return (
            <li key={i} id={data.id} className={styles.item} onClick={this.handleClickItem} ref={node => this.handleReadyItem(node, i)}>
              {data.title.toUpperCase()}
            </li>
          )
        })}
      </ul>
    )
  }

}