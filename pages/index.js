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
      <_Head title="home"/>
      <BackgroundContextSender position={({x:300,y:100})}/>
      <Works data={data}/>
      <h1>main page</h1>
      <Link href="/other">other page</Link>
    </div>
  )
}

export default Home

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく
export async function getStaticProps(context) {
  console.log("foo")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const data = await getWorks()
  return {props: {data}}
}