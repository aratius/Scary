import React from 'react'
import Base from '../components/react/base'
import MainView from '../components/react/top/mainView'
import InfoBar from '../components/react/top/infoBar'
import { getWorks } from '../components/api/works'
import styles from '../styles/layout/top.module.scss'

interface Props {
  works: {
    contents: Array<{
      main_image: {
        url: string
      },
      title: string
      id: string
    }>
  }
}

export default class Home extends React.Component<Props> {

  state: {
    id: string
  }

  constructor(props) {
    super(props)

    this.state = {
      id: "hoge"
    }
  }

  handleSelectWork = (id: string):void => {
    this.setState({ id: id })
  }

  render () {

    return (
      <Base
      title="TOP"
      >
        <div className={styles.container}>
          <InfoBar
            onSelectWork={this.handleSelectWork}
            works={this.props.works}
            />
          <MainView
            works={this.props.works}
            id={this.state.id}
            />
        </div>
      </Base>
    )
  }
}

// SSG WorksはSSGでよい
// getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  const works = await getWorks()
  return {props: {works}}
}
