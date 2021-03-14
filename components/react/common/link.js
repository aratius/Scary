import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'


// 消えるときにトランジションする用の自前Linkタグ
export default function TransitionLink (props) {

  const router = useRouter()
  console.log(router)

  const handleClick = (e) => {
    if(e) e.preventDefault()
    const el = document.querySelector('.transition__container')
    gsap.fromTo(el, {opacity: 1}, {opacity: 0, duration: 0.2, delay: 0, onComplete: () => {
      router.push({
        pathname: props.href
      })
    }})
  }

  console.log(props.children)
  return (
    <>
      <a onClick={handleClick}>{props.children}</a>
    </>
  )
}