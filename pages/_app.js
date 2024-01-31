import Layout from "../components/Layout/loginLayout";
import "../styles/global.css";
//import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "../components/UserContext";


export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<UserProvider> <Component {...pageProps} /></UserProvider>);
}
