import React from 'react'
import styles from '../../../styles/layout/components/aboutLink.module.scss'

interface Props {

}

export default class AboutLink extends React.Component<Props> {

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.header__title}>about</h4>
          <a className={styles.header__link}>see more</a>
        </div>

        <p className={styles.text}>arata matsumoto</p>
        <p className={styles.text}>20 years old</p>
        <p className={styles.text}>front-end developer</p>
      </div>
    )
  }

}