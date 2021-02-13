import React from 'react'
import styles from '../styles/background.module.css'
import gsap from 'gsap'

export default class Background extends React.Component {
  constructor(props) {
    super(props)
    this.circleRef = React.createRef()
  }

  componentDidMount() {
    const position = this.props.position
    this.updatePosition(position)
  }

  updatePosition(position) {
    const circle = this.circleRef.current
    gsap.to(circle , {
      x: position.x,
      y: position.y,
      duration: 1
    })
  }

  render () {
    return (
      <div>
        <div className={styles.circle} ref={this.circleRef}>
        </div>
      </div>
    )
  }
}