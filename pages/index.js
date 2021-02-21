import React from 'react'
import Link from 'next/link'
import Works from '../components/react/works'
import { useRouter } from 'next/router'
import _Head from '../components/react/head'
import BackgroundContextSender from '../components/animation/backgroundContextSender'
import { getWorks } from '../components/api/works'

const Home = ({ data }) =>  {
  return (
    <div className="container">
      <_Head title="home yo"/>
      <BackgroundContextSender position={({x:300,y:100})}/>
      <Works data={data}/>
      <h1>main page</h1>
      <Link href="/other">other page</Link>
    </div>
  )
}

export default Home

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  console.log("hello world")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const data = await getWorks()
  return {props: {data}}
}
