import dynamic from 'next/dynamic'
import createStyles from '../../styles/modules/create/index.module.scss'

const Pure = dynamic(() => import('../pixi/create/main'), {
  ssr: false
})

export default function Create () {

  return (
      <div className={createStyles.create__wrapper}>
        <Pure/>
      </div>
  )

}