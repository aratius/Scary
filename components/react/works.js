import React from 'react'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import stylesTop from '../../styles/modules/components/works-top.module.scss'
import stylesWorks from '../../styles/modules/components/works-works.module.scss'
import { STYLES_WORKS } from '../utils/config'

/**
 * WORKSを綺麗に揃える
 */
export default class _Works extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const works = this.props.data.contents
    const isTop = this.props.styles == STYLES_WORKS.TOP
    //適用するスタイルを分岐
    const styles = isTop ? stylesTop : stylesWorks

    const breakpointColumnsObj = isTop ? STYLES_WORKS.BREAKPOINTS.TOP : STYLES_WORKS.BREAKPOINTS.WORKS

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
                <li  key={key} className={styles.masonry__item}>
                  <Link href={`/works/${work.id}`}>
                    <img src={work.image.url}/>
                  </Link>
                </li>
              )
            })}
          </Masonry>
        </ul>
      </>
    )
  }
}
