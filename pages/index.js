import React from 'react'
import Link from 'next/link'
import Base from '../components/react/base'
import _Works from '../components/react/works'
import { getWorks } from '../components/api/works'
import styles from '../styles/modules/top.module.scss'
import { STYLES_WORKS } from '../components/utils/config'

export default function Home (props) {

  const data = props.works
  console.log(props);
  return (
    <Base
      circlePos={{x: 100, y: 500}}
      title="TOP"
    >
      <div className={styles.lead__container}>
        <img src="/assets/images/logo.svg"/>
      </div>
      <div className={styles.main__container}>
        <_Works data={data} styles={STYLES_WORKS.TOP}/>
        <div className={styles.about__container}>
          <img src="./assets/images/600x400.png"/>
          <div className={styles.about__content}>
            <p>ダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストです</p>
            <div className={styles.about__btn__container}>
              <Link href="/about">about</Link>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}

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
