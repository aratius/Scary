import React from 'react'
import Footer from './common/footer'
import Header from './common/header'
import dynamic from 'next/dynamic'
import TweenManager from '../utils/tweenManager'
import EventMananer, { Events } from '../common/events'
import Floating from './common/floating'

const Pure = dynamic(() => import('../pixi/main'), {
  ssr: false
})
export default class Layout extends React.Component {

  transitionContainer: HTMLElement

  onReadyTransitionContainer = (node) =>{
    this.transitionContainer = node
    EventMananer.removeListener(Events.OnImgLoad, this.show)
    EventMananer.removeListener(Events.OnClickLink, this.hide)
    EventMananer.on(Events.OnImgLoad, this.show)
    EventMananer.on(Events.OnClickLink, this.hide)
  }

  show = (callback) => {
    TweenManager.fadeIn(this.transitionContainer, 0.5).then(callback)
  }

  hide = (callback) => {
    TweenManager.fadeOut(this.transitionContainer, 0.5).then(callback)
  }

  render() {

    return (
      <div className="js__pixi__height">
        <Pure/>
        <Header/>
        <div ref={this.onReadyTransitionContainer}>
          {this.props.children}
          <Floating>
            <Footer/>
          </Floating>
        </div>
      </div>
    )
  }

}