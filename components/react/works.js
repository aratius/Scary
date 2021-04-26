import React from 'react'
import TransitionLink from './common/link'
import Masonry from 'react-masonry-css'
import stylesTop from '../../styles/modules/components/works-top.module.scss'
import { STYLES_WORKS } from '../utils/config'
import TweenManager from '../utils/tweenManager'

/**
 * WORKSを綺麗に揃える
 */
export default function _Works (props) {

  const handleMouseOver = (e) => {
    TweenManager.popUp(e.target)
  }

  const handleMouseOut = (e) => {
    TweenManager.popDown(e.target)
  }

  const works = props.data.contents

  //適用するスタイルを分岐
  const styles = stylesTop

  const breakpointColumnsObj = STYLES_WORKS.BREAKPOINTS.TOP

  return (
    <>
      <ul>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
          {works.length > 0 && works.map((work, key) => {
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
