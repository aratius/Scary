import { useRouter } from 'next/router'
import React from 'react'
import { getWorks } from '../../components/api/works'
import Base from '../../components/react/base'
import baseStyles from '../../styles/modules/common/base.module.scss'
import WorkDetailStyles from '../../styles/modules/works/detail.module.scss'

interface Props {
  works: {
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

  const router = useRouter()
  const works = props.works
  const descriptions = works.description.split("<hr>")
  console.log(descriptions);


  const randomPos = {x: Math.random() * 700, y: Math.random() * 700}

  const description = (sentence) => {
    return (
      <p className={WorkDetailStyles.description__wrapper}>
        {sentence.split('\n').map((data, i) => {
          return (
            <React.Fragment key={i}>
              <span className={WorkDetailStyles.description__detail}>{data}</span>
            </React.Fragment>
          )
        })}
      </p>
    )
  }

  return (
    <>
    <Base
      circlePos={randomPos}
      title="WORKS"
    >
      <div className={baseStyles.main__container}>
        <h2>{works.title}</h2>
        <div className={WorkDetailStyles.utils__container}>
          {/* 使用技術 */}
          {works.utils && works.utils.map((util, key) => {
            return(
              <span className={WorkDetailStyles.utils__detail} key={key}>
                {util}
              </span>
            )
          })}
        </div>
        {/* でっかいメイン画像 */}
        <img src={works.main_image.url} className={WorkDetailStyles.main__image}></img>
        <hr/>
        {descriptions[0]  && description(descriptions[0])}
        <hr/>

        {/*
          サブ画像とサブ説明
          ここのコードの気持ち悪さ半端ない
          システム構成見直す
        */}
        <div className={WorkDetailStyles.subimage__container}>
          {works.subimages && works.subimages.map((img ,i) => {
            const subimageStyle = i == 1 ? WorkDetailStyles.img__normal : WorkDetailStyles.img__small;
            return (
              <React.Fragment key={i} >
                <img src={img.subimage.url} className={`${subimageStyle} ${WorkDetailStyles.img__common}`}/>
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
    </Base>
    </>
  )
}

export default Work

export async function getStaticPaths () {
  const works = await getWorks()
  const paths = works.contents.map(data => {
    return `/works/${data.id}`
  })

  return { paths, fallback: false}
}

export async function getStaticProps ({params}) {
  const id = params.id
  const works = await getWorks(id)
  return {props: {works}}
}