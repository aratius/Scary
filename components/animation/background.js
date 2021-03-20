import React from 'react'
import styles from '../../styles/modules/background.module.scss'
import gsap from 'gsap'

export default class Background extends React.Component {
  constructor(props) {
    super(props)
    this.circleRef = React.createRef()
  }

  componentDidMount() {
    const {position} = this.props
    this.updatePosition(position)
  }

  componentDidUpdate() {
    const { position } = this.props;
    this.updatePosition(position);
  }

  updatePosition(position) {
    const circle = this.circleRef.current
    gsap.to(circle , {
      x: position.x,
      y: position.y,
      duration: 1.5,
      ease: "elastic.out"
    })
  }

  render () {
    return (
      <div className={styles.background}>
        <div className={styles.circle} ref={this.circleRef}></div>
      </div>
    )
  }
}