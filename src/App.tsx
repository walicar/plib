import "./config/init";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./AppRouter";
import { HelmetProvider } from "react-helmet-async";
import CognitoContext from "./components/context/CognitoClient";
import S3Context from "./components/context/S3Client";
import CognitoConfig from "./config/cognito";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { S3Client } from "@aws-sdk/client-s3";

const cognitoClient = new CognitoIdentityProviderClient(CognitoConfig);
const s3Client = new S3Client({});
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <CognitoContext.Provider value={cognitoClient}>
        <S3Context.Provider value={s3Client}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <AppRouter />
            </HelmetProvider>
          </QueryClientProvider>
        </S3Context.Provider>
      </CognitoContext.Provider>
    </>
  );
}

export default App;
