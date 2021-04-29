import dynamic from 'next/dynamic'
import { createRef, useState } from 'react'
import baseStyles from '../../styles/modules/common/base.module.scss'
import createStyles from '../../styles/modules/create/index.module.scss'

const Pure = dynamic(() => import('../pixi/create/main'), {
  ssr: false
})

export default function Create () {

  const [scene, setScene] = useState(null)

  function handleDecide (e) {
    if(e) e.preventDefault()
    const canvas = document.querySelector(".js__pixi__create").children[0]
  }

  return (
      <div className={createStyles.create__wrapper}>
        <Pure/>
      </div>
  )

}