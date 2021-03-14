import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'


// 消えるときにトランジションする用の自前Linkタグ
export default function TransitionLink (props) {

  const router = useRouter()

  const handleClick = (e) => {
    if(e) e.preventDefault()

    // 現在のパスは無効
    if(router.pathname == props.href) return

    const el = document.querySelector('.transition__container')
    gsap.fromTo(el, {opacity: 1}, {opacity: 0, duration: 0.2, delay: 0, onComplete: () => {
      router.push({
        pathname: props.href
      })
    }})
  }

  return (
    <>
      <a onClick={handleClick}>{props.children}</a>
    </>
  )
}