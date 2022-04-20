import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html lang="es">
            <Head>
                <meta name='application-name' content='Atrato' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content='Atrato' />
                <meta name='description' content='Techincal Test for Atrato' />
                <meta name='theme-color' content='#ffffff' />
                
                <link rel='apple-touch-icon' sizes='512x512' href='/icons/icon-512x512.png' />

                <link rel='icon' type='image/png' sizes='16x16' href='/favicon.png' />
                <link rel='manifest' href='/manifest.json' />

                <meta property='og:type' content='website' />
                <meta property='og:title' content='Atrato' />
                <meta property='og:description' content='Atrato' />
                <meta property='og:site_name' content='Atrato' />
                <meta property='og:url' content='https://technical-test-gamma.vercel.app/' />
                <meta property='og:image' content='https://technical-test-gamma.vercel.app/icons/icon-32x32.png' />
            </Head>
            <body className='dark'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
export default Document