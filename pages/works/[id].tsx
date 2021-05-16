import React from 'react'
import { getWorks } from '../../components/api/works'
import _Work from '../../components/react/common/work'

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

export default class Work extends React.Component<Props> {

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <_Work
        works={this.props.works}
      />
    )
  }

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