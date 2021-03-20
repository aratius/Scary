import React from 'react'
import dynamic from 'next/dynamic'
import Background from '../animation/background'
import BackgroundContext from '../context/backgroundContext'

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
        <Pure/>
        {/* updateごとにここにpositionをセットしたい */}
        <Background position={this.state.position}/>
        <BackgroundContext.Provider value={backgroundContext}>
          {this.props.children}
        </BackgroundContext.Provider>
      </>
    )
  }

}