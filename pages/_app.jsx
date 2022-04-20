import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Atrato Technical Test</title>
      <meta name="description" content="Techincal Test for Atrato" />
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' ></meta>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
