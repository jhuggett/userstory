import React from "react";
import { withTina, useCMS } from "tinacms";
import { ForestryClient, TinacmsForestryProvider } from "@forestryio/client";

function MyApp({ Component, pageProps }) {

  return (<TinacmsForestryProvider
    onLogin={(token: string) => {
      const headers = new Headers()

      //TODO - the token should could as a param from onLogin
      headers.append('Authorization', 'Bearer ' + token)
      fetch('/api/preview', {
        method: 'POST',
        headers: headers,
      }).then(() => {
        window.location.href = '/'
      })
      return ''
    }}
    onLogout={() => {console.log('exit edit mode')}}
  ><Component {...pageProps} /></TinacmsForestryProvider>
  )
}



export default withTina(MyApp, {
  apis: {
    forestry: new ForestryClient({
      realm: "your-realm-name", // this was set by you in the previous step
      clientId: "your-client-id", // this is visible in your Tina.io dashboard
      redirectURI: "your webpage url", //e.g http://localhost:3000
      // identityProxy: "", // we can use an identity proxy if we want to use a CSRF token (see token storage below)
      // customAPI: "", // might be used with the identityProxy, to proxy through a custom backend service.
      // tokenStorage: (Default Memory). Possible values: "MEMORY" | "LOCAL_STORAGE" | "CUSTOM".
      // NOTE: If you choose to use LOCAL_STORAGE, you may be prone to CSRF vulnerabilities.
      // getTokenFn: undefined, // This is only used when "tokenStorage" is set to "CUSTOM". Instead of grabbing the token from local storage, we can specify how its access token is retreived. You might want to use this if you are fetching content server-side.
    }),
  },
  sidebar: true,
});