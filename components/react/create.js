import dynamic from 'next/dynamic'
import baseStyles from '../../styles/modules/common/base.module.scss'

const Pure = dynamic(() => import('../pixi/create/main'), {
  ssr: false
})

export default function Create () {

  return (
      <>
        <Pure/>
      </>
  )

}