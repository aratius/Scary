import { useRouter } from 'next/router'
import React from 'react'
import { getWorks } from '../../components/api/works'
import Base from '../../components/react/base'
import baseStyles from '../../styles/modules/common/base.module.scss'
import WorkDetailStyles from '../../styles/modules/works/detail.module.scss'

export default function Work (props) {

  const router = useRouter()
  const works = props.works
  console.log(works);

  const randomPos = {x: Math.random() * 700, y: Math.random() * 700}

  return (
    <>
    <Base
      circlePos={randomPos}
      title="WORKS"
    >
      <div className={baseStyles.main__container}>
        <h2>{works.title}</h2>
        <div className={WorkDetailStyles.utils__container}>
          {works.utils && works.utils.map((util, key) => {
            return(
              <span className={WorkDetailStyles.utils__detail} key={key}>
                {util}
              </span>
            )
          })}
        </div>
        <img src={works.main_image.url} className={WorkDetailStyles.main__image}></img>
        <hr/>
        <p className={WorkDetailStyles.description__wrapper}>
          {works.description && works.description.split('\n').map((data, key) => {
            return (
              <React.Fragment key={key}>
                <span className={WorkDetailStyles.description__detail}>{data}</span>
                <br/>
              </React.Fragment>
            )
          })}
        </p>
        <hr/>
        <div className={WorkDetailStyles.subimage_container}>
          {works.subimages && works.subimages.map((img ,key) => {
            return (
              <img src={img.subimage.url} key={key} />
            )
          })}
        </div>
      </div>
    </Base>
    </>
  )

}

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