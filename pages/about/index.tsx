import React from 'react'
import Base from '../../components/react/base'
import _About from '../../components/react/about'
import { getAbout } from '../../components/api/about'

interface Props {
  data: any
}

const About: React.FC<Props> = ({data}) => {

  return (
    <Base
      title="ABOUT"
    >
      <_About data={data}/>
    </Base>
  )
}

export default About

export async function getStaticProps() {

  const data = await getAbout()
  return {props: {data}}

}