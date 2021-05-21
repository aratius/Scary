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
  mouseScrollY: number
  lastMouseScrollY: number
  mouseScrollSpeed: number
  dragging: boolean
  dragStartPositionY: number

  constructor(props) {
    super(props)
    this.titles = []
    this.titlePositions = []
    this.activeElementData  // アクティブな要素の情報 最初に一度決定されて、その後は変わることはない 別の要素に映ることもない 値としてアクティブな要素はここにいるべきですよというのを保持するだけ
    this.activeId  // アクティブ要素のid propsのイベントを発火するときに渡す この値は都度変更される
    this.scrollEndTimer
    this.scrolling = true
    this.mouseScrollY = 0  // マウスのY座標
    this.lastMouseScrollY = 0  // 前回のマウスのY座標
    this.mouseScrollSpeed = 0
    this.dragStartPositionY = 0  // touchend時にほとんど距離動いていなかったらタップとして、それ以外はスクロール
    this.dragging = false
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

  /**
   * スワイプスクロール Start
   * dragStartPositionを記憶し、handleItemClick時にy座標が大きく変わっていたら
   * クリックではなくスクロールと判断し、クリックをキャンセルする (handleClickItem参照)
   * @param e
   */
  handleMouseStart = (e) => {
    this.dragging = true

    // スマホタップのとき
    if(e.touches) {
      this.dragStartPositionY = e.touches[0].clientY
      this.lastMouseScrollY = e.touches[0].clientY
      this.mouseScrollY = e.touches[0].clientY
    }else {
      this.dragStartPositionY = e.clientY
      this.lastMouseScrollY = e.clientY
      this.mouseScrollY = e.clientY
    }

  }

  /**
   * スワイプスクロール Move
   * @param e
   * @returns
   */
  handleMouseMove = (e) => {
    if(!this.dragging) return

    const scrollInfo = {deltaY: 0}
    // スマホタップのとき
    if(e.touches) {
      this.lastMouseScrollY = this.mouseScrollY
      this.mouseScrollSpeed = e.touches[0].clientY - this.mouseScrollY
      this.mouseScrollY = e.touches[0].clientY
      scrollInfo.deltaY = -this.mouseScrollSpeed
      this.handleScroll(scrollInfo)
    }else {
      this.lastMouseScrollY = this.mouseScrollY
      this.mouseScrollSpeed = e.clientY - this.mouseScrollY
      this.mouseScrollY = e.clientY
      scrollInfo.deltaY = -this.mouseScrollSpeed
      this.handleScroll(scrollInfo)
    }
  }

  /**
   * スワイプスクロール End
   * @param e
   */
  handleMouseEnd = (e) => {
    if(e && e.cancelable) e.preventDefault();
    this.dragging = false
    this.mouseScrollSpeed = this.mouseScrollY - this.lastMouseScrollY

    // End時に一定のスピードがあれば、慣性を働かせる
    gsap.to(this, {mouseScrollSpeed: 0, duration: 0.5, ease: "circ.out", onUpdate: ()=>{
      const scrollInfo = {deltaY: 0}
      scrollInfo.deltaY = -this.mouseScrollSpeed
      this.handleScroll(scrollInfo)
    }})

  }

  /**
   * 実際にスクロール処理をするメソッド
   * マウスホイールスクロール
   * + スワイプスクロールから呼ばれるイベント
   * @param e
   * @returns
   */
  handleScroll = (e) => {
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
    this.props.onSelectWork(this.activeId)  // アクティブ要素を親に通知
  }

  handleReadyItem = (node, i) => {
    if(!node) return
    this.titles[i] = node

    // 上から三番目の要素を基準として位置を記憶しておく
    if(i == 2) {
      if(!this.activeElementData) {  // これは最初のマウント時に一回のみで良い
        this.activeElementData = node.getBoundingClientRect()
        this.activeId = node.id
        this.handleScrollEnd()
      }
    }
  }

  handleClickItem = (e) => {
    if(e && e.cancelable) e.preventDefault()

    if(e.touches) {
      const dragDist = this.mouseScrollY - this.dragStartPositionY
      if(dragDist > 5) return  // distが長い = スワイプしてたときは拒否
    }


    const el = e.target
    // opacity的に見えてない状態ならクリック不可能とする
    if (el.style.opacity < 0.02) {
      this.handleScrollEnd()
      return
    }

    this.activeId = el.id
    this.handleScrollEnd()  // tween長いのでonComplete待たずに実行

    // 全体をスクロールする
    const offset = this.activeElementData.top - el.getBoundingClientRect().top
    for(const i in this.titles) {
      gsap.to(this.titles[i], {y: `+=${offset}`, duration: 0.4, ease: "circ.out"})
    }
  }

  render () {
    const works = this.props.works.contents

    return (
      <ul className={styles.container}
        onWheel={this.handleScroll}
        onMouseDown={this.handleMouseStart}
        onTouchStart={this.handleMouseStart}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onMouseUp={this.handleMouseEnd}
        onTouchEnd={this.handleMouseEnd}
        >
        {works.map((data, i) => {
          return (
            <li key={i} id={data.id} className={styles.item} onClick={this.handleClickItem} onTouchEnd={this.handleClickItem} ref={node => this.handleReadyItem(node, i)}>
              {data.title.toUpperCase()}
            </li>
          )
        })}
      </ul>
    )
  }

}