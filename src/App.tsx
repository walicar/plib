import "./config/init";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./AppRouter";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AppRouter />
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
