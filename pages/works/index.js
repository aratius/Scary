import React from 'react'
import Link from 'next/link'
import Base from '../../components/react/base'
import _Works from '../../components/react/works'
import { getWorks } from '../../components/api/works'
import baseStyles from '../../styles/modules/common/base.module.scss'
import styles from '../../styles/modules/works/index.module.scss'
import { STYLES_WORKS } from '../../components/utils/config'

export default function Works (props) {

  const worksData = props.works

  return (
    <Base
      circlePos={{x: 100, y: 0}}
      title="WORKS"
    >
      <div className={baseStyles.main__container}>
        <h1>WORKS</h1>
        <_Works data={worksData} styles={STYLES_WORKS.WORKS}/>
      </div>
    </Base>
  )
}

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  console.log("static props top")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const works = await getWorks()
  return {props: {works}}
}