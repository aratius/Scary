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

    const duration = 1
    TweenManager.scrollToTop(duration)

    // 現在のパスは無効
    if(router.pathname == href) return

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