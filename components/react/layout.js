import React from 'react'
import Background from '../animation/background'
import BackgroundContext from '../context/backgroundContext'
import dynamic from 'next/dynamic'

const Pure = dynamic(() => import('../pixi/main'), {
  ssr: false
})

export default class Layout extends React.Component {

  constructor(props) {
    super(props)

    const updatePosition=(position)=>{
      if(!((this.state.position.x==position.x) && (this.state.position.y==position.y))){
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
          <Pure/>
          {this.props.children}
        </BackgroundContext.Provider>
      </>
    )
  }

}