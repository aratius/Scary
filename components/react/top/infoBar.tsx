import React from 'react'
import TitleList from './titleList'
import AboutLink from './aboutLink'

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
      <>
        <TitleList
          works={this.props.works}
        />
        <AboutLink />
      </>
    )
  }

}