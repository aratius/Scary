import React from 'react'
import Link from 'next/link'
import Base from '../../components/react/base'
import _About from '../../components/react/about'
import baseStyles from '../../styles/modules/common/base.module.scss'
import { getAbout } from '../../components/api/about'

export default function About (props) {

  const aboutData = props.data

  return (
    <Base
      circlePos={{x: 500, y: 300}}
      title="ABOUT"
    >
      <div className={baseStyles.main__container}>
        <img src="/assets/images/logos/about.svg" className={baseStyles.title}/>
        <_About data={aboutData}/>
      </div>
    </Base>
  )
}

export async function getStaticProps() {

  const data = await getAbout()
  return {props: {data}}

}