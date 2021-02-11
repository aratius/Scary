import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Works from '../components/react/works'

import { getWorks } from '../components/api/works'
export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      works: null
    }
  }

  componentDidMount = () => {
    getWorks().then(data => {
      console.log(data)
      this.setState({ works: data.contents })
    })
  }
  
  render() {
    const works = this.state.works
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Works/>
        <Link href="/fuck">fuck</Link>

      </div>
    )
  }
}
