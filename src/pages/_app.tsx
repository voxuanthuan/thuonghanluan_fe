import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '@mantine/core/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </MantineProvider>
  )
}