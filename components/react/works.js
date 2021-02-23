import React from 'react'
import Masonry from 'react-masonry-css'
import styles from '../../styles/modules/works.module.scss'

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
    const breakpointColumnsObj = {
      default: 4,
      1350: 3,
      1048: 2,
      576: 1,
    }
  
    return (
      <>
        <ul>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonry__grid}
            columnClassName={styles.masonry__grid__column}
          >
            {works != null && works.map((work, key) => {
              return (
                <li key={key} className={styles.masonry__item}>
                  <img src={work.image.url}/>
                </li>
              )
            })}
          </Masonry>
        </ul>
      </>
    )
  }
}
