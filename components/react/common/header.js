import React from 'react'
import Link from 'next/link'
import TransitionLink from './link'
import styles from '../../../styles/modules/common/header.module.scss'

export default class Header extends React.Component {

  render() {
    return (
      <>
        <div className={styles.container}>
          {/* <TransitionLink href="/"><img src="/assets/images/logos/cocoon.svg"/></TransitionLink> */}
          <TransitionLink href="/">title</TransitionLink>
          <ul>
            {/* <li><TransitionLink href="/works"><img src="/assets/images/logos/works.svg"/></TransitionLink></li>
            <li><TransitionLink href="/about"><img src="/assets/images/logos/about.svg"/></TransitionLink></li>
            <li><Link href=""><img src="/assets/images/logos/contact.svg"/></Link></li>
            <li><Link href=""><img src="/assets/images/logos/blog.svg"/></Link></li> */}
            <li><TransitionLink href="/works">link</TransitionLink></li>
            <li><TransitionLink href="/about">link</TransitionLink></li>
            <li><Link href="/">link</Link></li>
            <li><Link href="/">link</Link></li>
          </ul>
        </div>
      </>
    )
  }

}