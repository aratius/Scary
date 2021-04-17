import Head from 'next/head'

const _Head = (props) => {

  return (
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />

    </Head>
  )
}

export default _Head