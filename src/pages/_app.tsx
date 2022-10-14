import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from '../contexts/auth.context';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position='top-right'/>
    </AuthProvider>
  );
}

export default MyApp
