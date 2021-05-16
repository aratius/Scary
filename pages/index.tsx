import React from 'react'
import Base from '../components/react/base'
import InfoBar from '../components/react/top/infoBar'
import { getWorks } from '../components/api/works'
import styles from '../styles/layout/top.module.scss'

interface Props {
  works: {
    contents: Array<{
      main_image: {
        url: string
      },
      title: string
      id: string
    }>
  }
}

const Home: React.FC<Props> = ({works}) => {

  return (
    <Base
      title="TOP"
    >
      <div className={styles.container}>
        <InfoBar
          works={works}
        />
      </div>
    </Base>
  )
}

export default Home

// SSG WorksはSSGでよい
// getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  const works = await getWorks()
  return {props: {works}}
}
