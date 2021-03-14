import React from 'react'
import Link from 'next/link'
import TransitionLink from './link'
import styles from '../../../styles/modules/common/header.module.scss'

export default class Header extends React.Component {

  render() {
    return (
      <>
        <div className={styles.container}>
          <TransitionLink href="/"><img src="/assets/images/new-logo.png"/></TransitionLink>
          <ul>
            <li><TransitionLink href="/works">works</TransitionLink></li>
            <li><TransitionLink href="/about">about</TransitionLink></li>
            <li><Link href="">contact</Link></li>
            <li><Link href="">blog</Link></li>
          </ul>
        </div>
      </>
    )
  }

}