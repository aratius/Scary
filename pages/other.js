import React from "react";
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _Head from '../components/react/head'
import BackgroundContextSender from '../components/animation/backgroundContextSender'

const Other = () => {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  })

  const sender=<BackgroundContextSender position={({x:0,y:500})}/>
  if (!loaded) return sender;

  return (
    <div className="container">
      <_Head title="other page"/>
      {sender}
      {/* <Works/> */}
      <h1>other page</h1>
      <Link href="/">main page</Link>
    </div>
  )
}

export default Other