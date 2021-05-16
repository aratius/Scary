import React from 'react'

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
  if(!descriptions) return<></>  // TODO: エラー解決のハードコーディング ゆくゆくはdescriptionを必須にする

  const description = (sentence) => {

    return (
      <p >
        {sentence.length && sentence.split('\n').map((data, i) => {
          return (
            <React.Fragment key={i}>
              <span >{data}</span>
            </React.Fragment>
          )
        })}
      </p>
    )
  }

  return (
    <>
      <div>
        <h2>{work.title}</h2>
        <div >
          {/* 使用技術 */}
          {work.utils && work.utils.map((util, key) => {
            return(
              <span key={key}>
                {util}
              </span>
            )
          })}
        </div>
        {/* でっかいメイン画像 */}
        {descriptions[0]  && description(descriptions[0])}
        <hr/>

        {/*
          サブ画像とサブ説明
          ここのコードの気持ち悪さ半端ない
          システム構成見直す
        */}
        <div >
          {work.subimages && work.subimages.map((img ,i) => {
            return (
              <React.Fragment key={i} >
                <img src={img.subimage.url} />
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