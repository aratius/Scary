import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import TweenManager from '../../utils/tweenManager'
import EventManager, { Events } from '../../common/events'

interface Props {
  href: string
}

// 消えるときにトランジションする用の自前Linkタグ
const TransitionLink: React.FC<Props> = ({href, children}) => {

  const router = useRouter()

  const handleClick = (e) => {
    if(e) e.preventDefault()

    // 現在のパスは無効
    if(router.pathname == href) return

    const duration = 0.2
    TweenManager.scrollToTop(duration)

    EventManager.emit(Events.OnClickLink, ()=>{
      router.push({
        pathname: href
      })
    })
  }

  return (
    <>
      <a onClick={handleClick}>{children}</a>
    </>
  )
}

export default TransitionLink