import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html lang="es">
            <Head>
                <title>Technical Test</title>
                <meta name="description" content="Techincal Test for Atrato" />
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' ></meta>
            </Head>
            <body className='dark'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
export default Document