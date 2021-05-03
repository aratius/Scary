import React from 'react'
import Link from 'next/link'
import Base from '../components/react/base'
import _Works from '../components/react/works'
import { getWorks } from '../components/api/works'
import styles from '../styles/modules/top.module.scss'
import { STYLES_WORKS } from '../components/utils/config'

interface Props {
  works: {
    contents: Array<{
      main_image: {
        url: string
      },
      id: string
    }>
  }
}

const Home: React.FC<Props> = ({works}) => {


  return (
    <Base
      circlePos={{x: 100, y: 500}}
      title="TOP"
    >
      <div className={styles.main__container}>
        <_Works data={works} styles={STYLES_WORKS.TOP}/>
        <h5>mail: <a href="mailto: arata1128matsu@icloud.com">arata1129matsu@icloud.com</a></h5>
      </div>
    </Base>
  )
}

export default Home

// SSR
// Home.getInitialProps = async function (context) {
//   const works = await getWorks()
//   return {works}
// }

// SSG WorksはSSGでよい
// getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  const works = await getWorks()
  return {props: {works}}
}
