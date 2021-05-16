import React from 'react'
import Work from '../common/work'
import styles from '../../../styles/layout/components/worksFilter.module.scss'

interface Props {
  works: {
    contents: any
  }
}

// 同一ページ内でworkを切り替える
export default class WorksFilter extends React.Component<Props> {

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
        <Work works={this.state.work} />
      </div>
    )
  }


}