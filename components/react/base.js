import React from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'


export default function _Base (props) {

  return (
    <div className="container">
      <_Head title={props._title}/>
      <BackgroundContextSender position={(props.circlePos)}/>
      <Header/>
      {props.children}
    </div>
  )

}