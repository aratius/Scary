import React from 'react'
import Link from 'next/link'
import Works from '../components/react/works'
import { useRouter } from 'next/router'
import _Head from '../components/react/head'

const Home = () =>  {
  
  const router = useRouter()  //パス情報とか
  
  return (
    <div className="container">
      <_Head title="home"/>
  
      {/* <Works/> */}
      <h1>main page</h1>
      <Link href="/other">other page</Link>
    </div>
  )
}
  
export default Home 