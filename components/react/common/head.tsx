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

      {/* OG */}
      <meta property="og:url" content="https://scary.aualrxse.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="aualrxse" />
      <meta property="og:description" content="front end developer" />
      <meta property="og:site_name" content="arata matsumoto" />
      <meta property="og:image" content="https://scary.aualrxse.com/assets/images/og-image.jpg" />
      {/* <meta name="twitter:card" content="" /> */}
      <meta name="twitter:site" content="@aualrxse" />
    </Head>
  )
}

export default _Head