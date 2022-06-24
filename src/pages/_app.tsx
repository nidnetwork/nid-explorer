import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import theme from "@/theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NID Network</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon-32x32.png"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
