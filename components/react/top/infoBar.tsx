import React from 'react'
import TitleList from './titleList'
import AboutLink from './aboutLink'
import styles from '../../../styles/layout/components/infoBar.module.scss'
interface Props {
  works: {
    contents: Array<{
      title: string
    }>
  }
}

export default class InfoBar extends React.Component<Props> {

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className={styles.container}>
        <TitleList
          works={this.props.works}
        />
        <AboutLink />
      </div>
    )
  }

}