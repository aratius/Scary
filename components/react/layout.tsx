import React from 'react'
import TweenManager from '../utils/tweenManager'
import EventMananer, { Events } from '../common/events'

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
    // TweenManager.fadeIn(null, 0.5).then(callback)
  }

  hide = (callback) => {
    // TweenManager.fadeOut(null, 0.5).then(callback)
  }

  render() {

    return (
      <div className="js__pixi__height">
        <div ref={this.onReadyTransitionContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }

}