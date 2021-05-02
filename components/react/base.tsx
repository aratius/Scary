import React from 'react'
import _Head from './common/head'
import EventManager, { Events } from '../common/events'
import Floating from './common/floating'

interface Props {
  circlePos: {
    x: number,
    y: number
  },
  title: string
}

class _Base extends React.Component<Props> {

  private wrapper: HTMLElement

  // 全ての画像のローディング
  handleReadyDOM = async (node) => {
    if(!node) return
    this.wrapper = node
    const images = this.wrapper.getElementsByTagName('img')
    if(!images.length) this.handleLoadingComplete()
    const tasks = []
    for(const i in images) {
      const el = images[i]
      if(!(el instanceof HTMLElement)) continue
      tasks.push(new Promise<void>((res, rej) => {
        if(el.naturalWidth > 0 && el.complete){
          res()
        }
        else {
          // NOTE: イベントはvoidを期待できない？
          // https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement
          el.onload = () => {res()}
          el.onerror = () => {rej()}
        }
      }))
    }
    await Promise.all(tasks)
    this.handleLoadingComplete()
  }

  handleLoadingComplete = () => {
    // グローバル空間にイベント発火
    EventManager.emit(Events.OnImgLoad)
  }

  render () {

    return (
      <div className="container">
        <_Head title={`aualrxse | ${this.props.title}`}/>
        <div ref={this.handleReadyDOM}>
          <Floating>
            {this.props.children}
          </Floating>
        </div>
      </div>
    )
  }

}

export default _Base