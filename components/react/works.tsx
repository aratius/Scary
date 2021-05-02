import React from 'react'
import TransitionLink from './common/link'
import Masonry from 'react-masonry-css'
import stylesTop from '../../styles/modules/components/works-top.module.scss'
import { STYLES_WORKS } from '../utils/config'
import TweenManager from '../utils/tweenManager'
import { Interface } from 'node:readline'

// propsの内容（流石に使うものだけでよいか）を定義
interface Props {
  data: {
    contents: Array<{
      main_image: {
        url: string
      },
      id: string
    }>
  },
  styles: any
}

/**
 * WORKSを綺麗に揃える
 */
class _Works extends React.Component<Props> {

  handleMouseOver = (e) => {
  }

  handleMouseOut = (e) => {
  }

  render () {
    const works = this.props.data.contents

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
                <li key={key} className={styles.masonry__item}>
                  <TransitionLink href={`/works/${work.id}`}>
                    <img src={work.main_image.url} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>
                  </TransitionLink>
                </li>
              )
            })}
          </Masonry>
        </ul>
      </>
    )
  }
}

export default _Works