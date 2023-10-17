import "./config/init"
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./AppRouter";
import { HelmetProvider } from "react-helmet-async";
import CognitoContext from "./components/context/CognitoClient";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient();
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <CognitoContext.Provider value={cognitoClient}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <AppRouter />
          </HelmetProvider>
        </QueryClientProvider>
      </CognitoContext.Provider>
    </>
  );
}

export default App;
