import '../styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from  '../components/react/layout'

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}