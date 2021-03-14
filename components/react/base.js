import React, { useEffect, createRef } from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'
import gsap from 'gsap'

export default function _Base (props) {

  const wrapper = createRef(null)

  useEffect(() => {
    console.log("useEffect")
    loadImages()
  },[]);

  const loadImages = async () => {
    const images = wrapper.current.getElementsByTagName('img')
    if(!images.length) completeLoading()
    const tasks = []
    for(const i in images) {
      const el = images[i]
      if(!(el instanceof HTMLElement)) continue
      tasks.push(new Promise((res, rej) => {
        if(el.naturalWidth > 0 && el.complete){
          res()
        }
        else {
          el.onload = res()
          el.onerror = rej()
        }
      }))
    }
    console.log(tasks)
    await Promise.all(tasks)
    completeLoading()
  }

  // DOM要素はローディングを待ってからふわっと登場
  function completeLoading() {
    console.log("loading complete")
    gsap.fromTo(wrapper.current, {opacity: 0}, {opacity: 1, duration: 1, delay: 1})
  }

  return (
    <div className="container" ref={wrapper} style={{opacity: 0}}>
      <_Head title={props._title}/>
      <BackgroundContextSender position={(props.circlePos)}/>
      <Header/>
      {props.children}
    </div>
  )

}