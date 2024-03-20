import { Inter } from 'next/font/google'
import './globals.css'
import App from './components/App'
import { StoreProvider } from './redux/StoreProvider'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <StoreProvider>
          <App>{children}</App>
        </StoreProvider>


      </body>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FVTSRDBJW6"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FVTSRDBJW6');
        </script>
      </Head>
    </html>
  )
}
