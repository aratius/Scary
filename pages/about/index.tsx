import React from 'react'
import Link from 'next/link'
import Base from '../../components/react/base'
import _About from '../../components/react/about'
import baseStyles from '../../styles/modules/common/base.module.scss'
import { getAbout } from '../../components/api/about'

interface Props {
  data: any
}

const About: React.FC<Props> = ({data}) => {

  return (
    <Base
      circlePos={{x: 500, y: 300}}
      title="ABOUT"
    >
      <div className={baseStyles.main__container}>
        <h1>ABOUT</h1>
        <_About data={data}/>
      </div>
    </Base>
  )
}

export default About

export async function getStaticProps() {

  const data = await getAbout()
  return {props: {data}}

}