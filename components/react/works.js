import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { getWorks } from '../api/works'
export default class Works extends React.Component {

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
      <>
        <ul>
          {works != null && works.map((work, key) => {
            return (
              <li key={key}>
                <h1>{work.title}</h1>
                <p>{work.description}</p>
                <img src={work.image.url}/>
              </li>
            )
          })}
        </ul>
      </>
    )
  }
}
