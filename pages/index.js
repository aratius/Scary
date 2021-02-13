import React from 'react'
import Link from 'next/link'
import Works from '../components/react/works'
import { useRouter } from 'next/router'
import _Head from '../components/react/head'
import BackgroundContextSender from '../components/animation/backgroundContextSender'

const Home = () =>  {
  return (
    <div className="container">
      <_Head title="home"/>
      <BackgroundContextSender position={({x:300,y:100})}/>
      {/* <Works/> */}
      <h1>main page</h1>
      <Link href="/other">other page</Link>
    </div>
  )
}

export default Home