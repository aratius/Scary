import React, { DOMElement } from 'react'
import _Head from './common/head'
import gsap from 'gsap'
import EventManager, { Events } from '../common/events'
import Floating from './common/Floating'

interface Props {
  circlePos: {
    x: number,
    y: number
  },
  title: string
}

class _Base extends React.Component<Props> {

  private fallTweens: any[]
  private moveInTweens: any[]
  private elements: HTMLElement[]
  private scrollPos: number
  private wrapper: HTMLElement

  constructor(props: any) {
    super(props)
    this.fallTweens = []
    this.moveInTweens = []
    this.elements
    this.scrollPos = 0
  }

  componentDidMount() {
    this.scrollPos = window.pageYOffset

  }

  // 全ての画像のローディング
  onDOMReady = async (node) => {
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
    EventManager.emit(Events.OnImgLoad)
  }

  render () {

    return (
      <div className="container">
        <_Head title={`aualrxse | ${this.props.title}`}/>
        <div ref={this.onDOMReady}>
          <Floating>
            {this.props.children}
          </Floating>
        </div>
      </div>
    )
  }

}

export default _Base