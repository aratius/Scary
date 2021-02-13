import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _Head from '../components/react/head'

const Other = () => {

  const router = useRouter()

  return (
    <div className="container">
      <_Head title="other page"/>
      {/* <Works/> */}
      <h1>other page</h1>
      <Link href="/">main page</Link>
    </div>
  )
}

export default Other