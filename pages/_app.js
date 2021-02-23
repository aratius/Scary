import '../styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from  '../components/react/layout'
import Background from '../components/animation/background'

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
}