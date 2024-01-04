// import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr";

import {AuthProvider, UiProvider, CartProvider} from '../context';
import {lightTheme} from '../themes'


export default function App({ Component, pageProps:  { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
      }}
      >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline>
                <Component {...pageProps} />
              </CssBaseline>
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
      </SessionProvider>
  );
}
