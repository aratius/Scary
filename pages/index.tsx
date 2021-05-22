import React, { ReactComponentElement } from 'react'
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

  mainView: React.RefObject<HTMLElement>
  state: {
    id: string
    changed: number
  }

  constructor(props) {
    super(props)

    this.state = {
      id: null,
      changed: Date.now()
    }
  }

  handleSelectWork = (id: string):void => {
    this.setState({ id: id })
  }

  handleChangeWork = ():void => {
    this.setState({ changed: Date.now() })
  }

  render () {

    return (
      <Base
      title="TOP"
      >
        <div className={styles.container}>
          <InfoBar
            onSelectWork={this.handleSelectWork}
            onChangeWork={this.handleChangeWork}
            works={this.props.works}
            />
          <MainView
            works={this.props.works}
            id={this.state.id}
            changed={this.state.changed}
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
