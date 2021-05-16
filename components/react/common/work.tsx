import React from 'react'
import styles from '../../../styles/layout/components/work.module.scss'

export interface Props {
  work: {
    title: string,
    utils: string[],
    description: string,
    main_image: {
      url: string
    },
    subimages: Array<{
      subimage: {
        url: string
      }
    }>,
    sub_description_1: string,
    sub_description_2: string
  }
}

const Work: React.FC<Props> = (props) => {

  const work = props.work

  const descriptions = work.description && work.description.split("<hr>")
  if(!descriptions)
    return(
      <div className={styles.container}>
        <h1 className={styles.title}>{work.title}</h1>
      </div>
    )  // TODO: エラー解決のハードコーディング ゆくゆくはdescriptionを必須にする

  const description = (sentence) => {

    return (
      <p>
        {sentence.split('\n').length && sentence.split('\n').map((data, i) => {
          return (
            <React.Fragment key={i}>
              <span className={styles.description}>{data}</span>
              {i != sentence.split('\n').length - 1 && <br/>}
            </React.Fragment>
          )
        })}
      </p>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{work.title}</h1>
        <div className={styles.utils}>
          {/* 使用技術 */}
          {work.utils && work.utils.map((util, key) => {
            return(
              <span key={key}>
                {util}
              </span>
            )
          })}
        </div>

        {/* メイン説明 */}
        {descriptions[0]  && description(descriptions[0])}
        <hr/>

        {/* サブ画像とサブ説明 */}
        <div className={styles.detail}>
          {work.subimages && work.subimages.map((img ,i) => {
            return (
              <React.Fragment key={i}>
                <img src={img.subimage.url} className={styles.detail__subimage}/>
                {descriptions[i+1] ?
                  <>
                    <hr/>
                      {description(descriptions[i+1])}
                    <hr/>
                  </>
                  :
                  <br/>
                }
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Work