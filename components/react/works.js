import React from 'react'
import TransitionLink from './common/link'
import Masonry from 'react-masonry-css'
import stylesTop from '../../styles/modules/components/works-top.module.scss'
import stylesWorks from '../../styles/modules/components/works-works.module.scss'
import { STYLES_WORKS } from '../utils/config'
import TweenManager from '../utils/tweenManager'

/**
 * WORKSを綺麗に揃える
 */
export default function _Works (props) {

  const handleMouseOver = (e) => {
    console.log(e.target)
    TweenManager.popUp(e.target)
  }

  const handleMouseOut = (e) => {
    TweenManager.popDown(e.target)
  }

  const works = props.data.contents
  const isTop = props.styles == STYLES_WORKS.TOP
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
                <TransitionLink href={`/works/${work.id}`}>
                  <img src={work.main_image.url} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
                </TransitionLink>
              </li>
            )
          })}
        </Masonry>
      </ul>
    </>
  )
}
