import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/auth.context';
import Modal from 'react-modal';
import Head from 'next/head';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.5" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer position='top-right'/>
    </AuthProvider>
  );
}

export default MyApp
