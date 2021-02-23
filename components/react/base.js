import React from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'

export default class Base extends React.Component {

  /**
   * サブクラスでオーバーライド--------------------------
   */
  get circlePos() {
    return {x: 0, y: 0}
  }

  get _title() {
    return `new | ${this.title}`
  }
  /**
   * ここまで----------------------------------------
   */
  
  renderChild = () => {
    return null
  }
  
  render = () => {
    return(
      <>
        <div className="container">
          <_Head title={this._title}/>
          <BackgroundContextSender position={(this.circlePos)}/>
          <Header/>
          {this.renderChild()}
        </div>
      </>
    )
  }
}