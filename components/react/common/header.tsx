import React from 'react'
import Link from 'next/link'
import TransitionLink from './link'
import styles from '../../../styles/modules/common/header.module.scss'

export default class Header extends React.Component {

  render() {
    return (
      <>
        <div className={styles.container}>
          <ul>
            <li><TransitionLink href="/about">about</TransitionLink></li>
            <span>-</span>
            <li><Link href="/">link</Link></li>
            <span>-</span>
            <li><Link href="/">link</Link></li>
            {/* <span>-</span> */}
            <li><TransitionLink href="/"><img src="/assets/images/logo.svg"/></TransitionLink></li>
          </ul>
        </div>
      </>
    )
  }

}