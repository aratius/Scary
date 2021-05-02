import Head from 'next/head'

interface Props {
  title: string
}

const _Head: React.FC<Props> = ({title}) => {

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
    </Head>
  )
}

export default _Head