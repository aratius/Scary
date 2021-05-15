import React from 'react'
import Base from '../components/react/base'
import { getWorks } from '../components/api/works'

interface Props {
  works: {
    contents: Array<{
      main_image: {
        url: string
      },
      id: string
    }>
  }
}

const Home: React.FC<Props> = ({works}) => {

  return (
    <Base
      title="TOP"
    >
      hello
    </Base>
  )
}

export default Home

// SSR
// Home.getInitialProps = async function (context) {
//   const works = await getWorks()
//   return {works}
// }

// SSG WorksはSSGでよい
// getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  const works = await getWorks()
  return {props: {works}}
}
