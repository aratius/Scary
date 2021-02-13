import React from 'react'
import _Head from './head'
import Background from '../animation/background'
import BackgroundContext from '../context/backgroundContext'

export default class Layout extends React.Component {

  constructor(props) {
    super(props)

    const updatePosition=(position)=>{
      if(
        !(
          (this.state.position.x==position.x) &&
          (this.state.position.y==position.y)
        )
      ){
        console.log('updatePosition')
        this.setState({
          position,
        })
      }
    }

    this.state={
      position:{x:null,y:null},
      updatePosition,
    }

  }

  render() {
    const backgroundContext={
      position:this.state.position,
      updatePosition:this.state.updatePosition,
    }

    return (
      <>
        {/* updateごとにここにpositionをセットしたい */}
        <Background position={this.state.position}/>
        <BackgroundContext.Provider value={backgroundContext}>
          {this.props.children}
        </BackgroundContext.Provider>
      </>
    )
  }

}