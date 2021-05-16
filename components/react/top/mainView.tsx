import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Works from './worksFilter'

interface Props {
  works: any
}

export default class MainView extends React.Component<Props> {

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.main_view}>{/** canvasアニメーションはこの中で */}</div>
        <Works
          works={this.props.works}
        />
      </div>
    )
  }

}