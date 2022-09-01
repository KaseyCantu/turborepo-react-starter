import { AppProps } from "next/app";

// CSS
import '../styles/globals.css';

/**
 * The wrapper for all pages. Provides a place for site-wide functionality, such as error handling,
 * persisting data, maintaining state between pages, etc.
 *
 * NOTE: Do not add HTML output here. Use a layout component instead
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
