import React from 'react'
import _Head from './head'
import Background from '../animation/background'

export default class Layout extends React.Component {

  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <>
        {/* updateごとにここにpositionをセットしたい */}
        <Background position={({x: 100, y: 100})}/>
        {this.props.children}
      </>
    )
  }
  
}