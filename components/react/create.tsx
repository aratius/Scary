import dynamic from 'next/dynamic'
import { createRef, useState } from 'react'
import createStyles from '../../styles/modules/create/index.module.scss'

const Pure = dynamic(() => import('../pixi/create/main'), {
  ssr: false
})

export default function Create () {

  const [scene, setScene] = useState(null)

  return (
      <div className={createStyles.create__wrapper}>
        <Pure/>
      </div>
  )

}