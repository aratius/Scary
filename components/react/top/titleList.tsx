import React from 'react'

interface Props {
  works: {
    contents: Array<{
      title: string
    }>
  }
}

export default class TitleList extends React.Component<Props> {

  render () {
    const works = this.props.works.contents
    console.log(works);

    return (
      <ul>
        {works.map((data, key) => {
          return (
            <li key={key}>{data.title.toUpperCase()}</li>
          )
        })}
      </ul>
    )
  }

}