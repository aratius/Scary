import React from 'react'
import Link from 'next/link'
import Base from '../../components/react/base'
import _Works from '../../components/react/works'
import { getWorks } from '../../components/api/works'
import styles from '../../styles/modules/works/index.module.scss'
import { STYLES_WORKS } from '../../components/utils/config'

export default class Works extends Base {

  //ページタイトル
  get title () {
    return 'WORKS'
  }

  //背景のサークルの座標 
  get circlePos() {
    return {x: 100, y: 500}
  }

  componentDidMount() {
  }

  renderChild = () => {
    const data = this.props.works
    return (
      <>
        <div className={styles.main__container}>
          <_Works data={data} styles={STYLES_WORKS.WORKS}/>
        </div>
      </>
    )
  }
}

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  console.log("static props top")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const works = await getWorks()
  return {props: {works}}
}
