import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/auth.context';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position='top-right'/>
    </AuthProvider>
  );
}

export default MyApp
