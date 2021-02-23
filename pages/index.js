import React from 'react'
import Link from 'next/link'
import Base from '../components/react/base'
import Works from '../components/react/works'
import { getWorks } from '../components/api/works'
export default class Home extends Base {

  //ページタイトル
  get title () {
    return 'TOP'
  }

  //背景のサークルの座標 
  get circlePos() {
    return {x: 100, y: 500}
  }
  
  renderChild = () => {
    const data = this.props.works
    return (
      <>
        <Works data={data}/>
        <h1>main page</h1>
        <Link href="/other">other page</Link>
      </>
    )
  }
}

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  console.log("hello world")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const works = await getWorks()
  return {props: {works}}
}
