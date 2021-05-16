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
  topItem: any
  bottomItem: any
  updater: any

  constructor(props) {
    super(props)
    this.titles = []
    this.titlePositions = []
    this.activeElementData
  }

  componentDidMount() {
    this.update()
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updater)
  }

  update = ():void => {
    const topThresold = this.activeElementData.top - this.activeElementData.height * 3

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

        // 上に消えて下に追加
        if(rect.top < topThresold) {
          gsap.set(this.titles[i], {y: this.titles[this.titles.length-1].getBoundingClientRect().bottom - 70})  // NOTE: 70 = コンテナのpaddingTop
        }

        const newrect = this.titles[i].getBoundingClientRect();
        const newdist = Math.abs(newrect.top - this.activeElementData.top)
        const alpha = 1 - (newdist / 80)
        gsap.set(this.titles[i], { alpha: alpha })  // 文字列で+=100と書くと+=現在からの相対移動が可能

      }

    }

    this.updater = requestAnimationFrame(this.update)
  }

  handleScroll = (e) => {
    // if(e && e.cancelable) e.preventDefault();
    // 親でpreventDefaultしているのでしなくて良い
    if(this.titles.length == 0) return

    for(const i in this.titles) {
      gsap.set(this.titles[i], {y: `+=${e.deltaY/2}`})  // 文字列で+=100と書くと+=現在からの相対移動が可能
    }
  }

  handleReadyItem = (node, i) => {
    this.titles[i] = node

    // 上から三番目の要素を基準として位置を記憶しておく
    if(i == 2) {
      this.activeElementData = node.getBoundingClientRect()
    }
  }

  render () {
    const works = this.props.works.contents

    return (
      <ul className={styles.container} onWheel={this.handleScroll}>
        {works.map((data, i) => {
          return (
            <li key={i} className={styles.item} ref={node => this.handleReadyItem(node, i)}>
              {data.title.toUpperCase()}
            </li>
          )
        })}
      </ul>
    )
  }

}