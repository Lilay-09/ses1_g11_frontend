import Modal from "../components/Modal";
import Notify from "../components/Notify";
import Layout from "../sections/layout";
import { GlobalState } from "../store/globalstate";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Layout>
        <Notify />
        <Component {...pageProps} />
      </Layout>
    </GlobalState>
  );
}

export default MyApp;
