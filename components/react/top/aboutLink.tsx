import React from 'react'
import styles from '../../../styles/layout/components/aboutLink.module.scss'

interface Props {
  onClickAbout: any
}

export default class AboutLink extends React.Component<Props> {

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.header__title}>about</h4>
          <a className={styles.header__link}
            onClick={this.props.onClickAbout}
            onTouchEnd={this.props.onClickAbout}
          >
            see more
          </a>
        </div>

        <p className={styles.text}>arata matsumoto</p>
        <p className={styles.text}>front-end developer</p>
        <a
          className={styles.text}
          onClick={():void=>{
            window.location.href ="mailto:arata1129matsu@icloud.com"
            alert("Let me start the mailer")
          }}
          onTouchEnd={():void=> {
            window.location.href ="mailto:arata1129matsu@icloud.com"
            alert("Let me start the mailer")
          }}
        >arata1129matsu@icloud.com
        </a>
      </div>
    )
  }

}