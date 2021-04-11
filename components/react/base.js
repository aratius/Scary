import React, { useEffect, createRef, useState } from 'react'
import _Head from './common/head'
import BackgroundContextSender from '../animation/backgroundContextSender'
import Header from './common/header'
import gsap from 'gsap'
import Footer from './common/footer'

export default function _Base (props) {

  const wrapper = createRef(null)
  let appearTween = null
  let fallTweens = []
  let moveInTweens = []
  let elements
  let scrollPos = 0

  useEffect(() => {
    loadImages()

    scrollPos = window.pageYOffset

    window.addEventListener("scroll", handleScroll)
    return()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  },[]);

  // 全ての画像のローディング
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

    // appear animation
    if(appearTween) appearTween.kill()
    appearTween = gsap.fromTo(wrapper.current, {opacity: 0}, {opacity: 1, duration: 0.5, delay: 0.3})

    elements = []
    children(wrapper.current, (el)=>elements.push(el))

    floatTween(elements, 10)
  }

  /**
   * 末端の子要素を見つけてcallbackの引数に渡す
   * @param {DOM} parentDOM
   * @param {fn} callback
   */
  function children (parentDOM, callback) {
    const _elements = []
    for(const i in parentDOM.children) {
      const DOM = parentDOM.children[i]
      if(!(DOM instanceof HTMLElement)) continue

      // さらに子要素を持っていれば末端ではないので再起関数にかける
      if(DOM.children.length >= 1) {
        children(DOM, callback)
      }else{  // 持っていなければ末端に達したということなのでcallbackで下の配列にpushする
        callback(DOM)
      }
    }
    return _elements
  }

  // 水面をふわふわ浮かんでいるようなtween
  function floatTween(elements, range) {
    // moveIn animation
    if(moveInTweens.length) for(const i in moveInTweens) moveInTweens[i].kill()
    if(fallTweens.length) for(const i in fallTweens) fallTweens[i].kill()
    for(const i in elements){
      const dur = Math.random()*10 + 5
      const x = (Math.random()-0.5) * 2 * range + "px"
      const y = (Math.random()-1.3) * 3 * range + "px"
      moveInTweens[i] = gsap.fromTo(elements[i], {x: x, y: y}, {x: 0, y: 0, duration: dur, delay: 0, ease: "elastic.out(5)"})
    }
  }

  // スクローススピード早ければフロート
  function handleScroll() {
    const currentPos = window.pageYOffset
    const scrollSpeed = Math.abs(currentPos - scrollPos)
    if(scrollSpeed > 500) {
      floatTween(elements, scrollSpeed / 300)
    }

    scrollPos = currentPos
  }

  return (
    <div className="container js__pixi__height">
      <_Head title={`Cocoon | ${props.title}`}/>
      <BackgroundContextSender position={(props.circlePos)}/>
      <Header/>
      <div className="transition__container" ref={wrapper}>
        {props.children}
      </div>
      <Footer/>
    </div>
  )

}