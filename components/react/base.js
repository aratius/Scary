import React, { useEffect, createRef, useCallback } from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'
import gsap from 'gsap'

export default function _Base (props) {

  const wrapper = createRef(null)
  let appearTween = null
  let fallTweens = []
  let moveInTweens = []

  useEffect(() => {
    console.log("useEffect")
    loadImages()
  },[]);

  const loadImages = async () => {
    const images = wrapper.current.getElementsByTagName('img')
    if(!images.length) handleLoadingComplete()
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
    await Promise.all(tasks)
    handleLoadingComplete()
  }

  // DOM要素はローディングを待ってからふわっと登場
  function handleLoadingComplete() {
    console.log("loading complete")

    // appear animation
    if(appearTween) appearTween.kill()
    appearTween = gsap.fromTo(wrapper.current, {opacity: 0}, {opacity: 1, duration: 0.5, delay: 0.3})

    const elements = []
    children(wrapper.current, (el)=>elements.push(el))

    // moveIn animation
    if(moveInTweens.length) for(const i in moveInTweens) moveInTweens[i].kill()
    if(fallTweens.length) for(const i in fallTweens) fallTweens[i].kill()
    for(const i in elements){
      const dur = Math.random()*10 + 5
      const x = (Math.random()-0.5) * 20 + "px"
      const y = (Math.random()-1.3) * 30 + "px"
      moveInTweens[i] = gsap.fromTo(elements[i], {x: x, y: y}, {x: 0, y: 0, duration: dur, delay: 0, ease: "elastic.out(5)"})
    }
  }

  /**
   * 末端の子要素を見つけてcallbackの引数に渡す
   * @param {DOM} parentDOM
   * @param {fn} callback
   */
  function children (parentDOM, callback) {
    const elements = []
    for(const i in parentDOM.children) {
      const DOM = parentDOM.children[i]
      if(!(DOM instanceof HTMLElement)) continue

      // さらに子要素を持っていれば末端ではないので再起関数にかける
      if(DOM.children.length >= 1) {
        children(DOM, callback)
      }else{  // 持っていなければ末端に達したということなのでcallbackで下の配列にpushする
        console.log('push------');
        callback(DOM)
      }
    }
    return elements
  }

  return (
    <div className="container">
      <_Head title={`Cocoon | ${props.title}`}/>
      <BackgroundContextSender position={(props.circlePos)}/>
      <Header/>
      <div className="transition__container" ref={wrapper}>
        {props.children}
      </div>
    </div>
  )

}