import React from 'react'
import styles from '../../../styles/layout/components/titleList.module.scss'

interface Props {
  works: {
    contents: Array<{
      title: string
    }>
  }
}

export default class TitleList extends React.Component<Props> {

  handleScroll = (e) => {
    console.log("scroll");

  }

  render () {
    const works = this.props.works.contents

    return (
      <ul className={styles.container} onWheel={this.handleScroll}>
        {works.map((data, key) => {
          return (
            <li key={key} className={styles.item}>{data.title.toUpperCase()}</li>
          )
        })}
      </ul>
    )
  }

}