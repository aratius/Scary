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
    const el = document.querySelector(".transition__container")
    el.style.opacity = 1
    console.log("loading complete")
    gsap.fromTo(wrapper.current, {opacity: 0, y: "10px"}, {opacity: 1, y: 0, duration: 0.5, delay: 0.3})
  }

  return (
    <div className="container transition__container" ref={wrapper}>
      <_Head title={`Cocoon | ${props.title}`}/>
      <BackgroundContextSender position={(props.circlePos)}/>
      <Header/>
      {props.children}
    </div>
  )

}