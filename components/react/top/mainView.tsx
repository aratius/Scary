import React from 'react'
import styles from '../../../styles/layout/components/mainView.module.scss'
import Work from '../common/work'

interface Props {
  works: {
    contents: any[]
  },
  id: string
}

export default class MainView extends React.Component<Props> {

  state: {
    work: any
  }

  constructor(props) {
    super(props);
  }

  render () {

    const work = this.props.works.contents.filter((data) => data.id == this.props.id)[0]

    if(!work) return <></>

    return (
      <div className={styles.container}>
        {/* <div className={styles.main_view}>* canvasアニメーションはこの中で</div> */}
        <div className={styles.main_view}>
          <img src={work.main_image.url} />
        </div>

        <div className={styles.work_view}>
          <Work work={work} />
        </div>
      </div>
    )
  }

}