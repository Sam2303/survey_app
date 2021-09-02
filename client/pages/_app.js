import "../styles/styles.scss";
import { SurveysProvider } from "../context/SurveysContext";

function MyApp({ Component, pageProps }) {
  return(
  <SurveysProvider>
    <Component {...pageProps} />
  </SurveysProvider>
  );
}

export default MyApp;
