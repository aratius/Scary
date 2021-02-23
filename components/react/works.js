import React from 'react'

/**
 * WORKSを綺麗に揃える
 */
export default class Works extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      works: null
    }
  }
  
  render() {
    const works = this.props.data.contents
    return (
      <>
        <ul>
          {works != null && works.map((work, key) => {
            return (
              <li key={key}>
                <h1>{work.title}</h1>
                <p>{work.description}</p>
                <img src={work.image.url}/>
              </li>
            )
          })}
        </ul>
      </>
    )
  }
}
