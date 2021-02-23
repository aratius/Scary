import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/modules/common/header.module.scss'

export default class Header extends React.Component {

  render() {
    return (
      <>
        <div className={styles.container}>
          <img src="./assets/images/new-logo.png"/>
          <ul>
            <li><Link href="">works</Link></li>
            <li><Link href="">about</Link></li>
            <li><Link href="">contact</Link></li>
            <li><Link href="">blog</Link></li>
          </ul>
        </div>
      </>     
    )
  }
  
}