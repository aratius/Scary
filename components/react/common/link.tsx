import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import TweenManager from '../../utils/tweenManager'
import EventManager, { Events } from '../../common/events'

// 消えるときにトランジションする用の自前Linkタグ
export default function TransitionLink (props) {

  const router = useRouter()

  const handleClick = (e) => {
    if(e) e.preventDefault()

    // 現在のパスは無効
    if(router.pathname == props.href) return

    const duration = 0.2
    TweenManager.scrollToTop(duration)

    EventManager.EmitEvent(Events.OnClickLink, ()=>{
      router.push({
        pathname: props.href
      })
    })
  }

  return (
    <>
      <a onClick={handleClick}>{props.children}</a>
    </>
  )
}