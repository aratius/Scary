import React, { ReactNode } from 'react'
import gsap from 'gsap'
import EventManager, { Events } from '../../common/events'

interface Props {
  children: ReactNode,
  onReadyElement: Function
}

// 末端までの子要素をすべて取得してなんかできるコンポーネント
class Floating extends React.Component<Props> {

  private elements: HTMLElement[]
  private wrapper: HTMLElement

  constructor(props: any) {
    super(props)
    this.elements

    EventManager.on(Events.OnImgLoad, this.handleLoadingComplete)
  }

  // DOM要素はローディングを待ってからふわっと登場
  handleLoadingComplete = () => {

    const elements = []
    this.searchChildren(this.wrapper, (el)=>elements.push(el))
    this.elements = elements
    if(this.props.onReadyElement) {
      for(const i in this.elements) {
        this.props.onReadyElement(this.elements[i])
      }
    }

  }

  /**
   * 再帰関数
   * 末端の子要素を見つけてcallbackの引数に渡す
   */
  searchChildren (parentDOM: HTMLElement, callback: (DOM: HTMLElement) => void) {
    if(!parentDOM) return
    const _elements = []
    for(const i in parentDOM.children) {
      const DOM = parentDOM.children[i]
      if(!(DOM instanceof HTMLElement)) continue

      // さらに子要素を持っていれば末端ではないので再起関数にかける
      if(DOM.children.length >= 1) {
        this.searchChildren(DOM, callback)
      }else{  // 持っていなければ末端に達したということなのでcallbackで下の配列にpushする
        callback(DOM)
      }
    }
    return _elements
  }

  render () {

    return (
      <div ref={node => this.wrapper = node}>
        {this.props.children}
      </div>
    )
  }

}

export default Floating