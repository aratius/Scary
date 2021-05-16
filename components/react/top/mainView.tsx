import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'

interface Props {
  works: {
    contents: any[]
  }
}

export default class MainView extends React.Component<Props> {

  state: {
    work: any
  }

  constructor(props) {
    super(props);
    this.state = {
      work: this.props.works.contents[0]
    }
  }

  render () {
    return (
      <div className={styles.container}>
        {/* <div className={styles.main_view}>* canvasアニメーションはこの中で</div> */}
        <div className={styles.main_view}>
          <img src={this.state.work.main_image.url} />
        </div>

        <div className={styles.work_view}>
          <Work work={this.state.work} />
        </div>
      </div>
    )
  }

}