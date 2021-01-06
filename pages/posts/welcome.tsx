import Cookies from 'cookies'
import { usePlugin } from "tinacms";
import {
  useForestryForm,
  ForestryClient,
  DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
} from "@forestryio/client";

// These are your generated types from CLI
import { DocumentUnion, Query } from "../../.tina/types";

export async function getServerSideProps(params) {
  const path = `welcome.md`;
  

  const cookies = new Cookies(params.req, params.res)
  const authToken = cookies.get('tinaio_token')

  const client = new ForestryClient({
    realm: "your-realm-name", // this was set by you in the previous step
    clientId: "your-client-id", // this is visible in your Tina.io dashboard
    redirectURI: "http://localhost:3000", //e.g http://localhost:3000
    customAPI: params.preview ? undefined : DEFAULT_LOCAL_TINA_GQL_SERVER_URL,
    tokenStorage: "CUSTOM",
    getTokenFn: () => authToken //supply our own function to just return the token
  });

  console.log(path);
  
  const content = await client.getContentForSection<DocumentUnion>({
    relativePath: path,
    section: 'posts'
  });

  return { props: {
    ...content
  } };
  

  
}

export default function Home( { document }) {
  
  const content = document.node
  //console.log(content);
  


  usePlugin(content.form);
  


  return (
    <div>
      <h1>{content.data.title}</h1>
    </div>
  );
}