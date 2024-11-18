import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const initializeQueryClient = () => {
  return new QueryClient();
};

const queryClient = initializeQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const MainContent = () => (
  <main className="flex min-h-screen items-center justify-center py-32">
    <Entrypoint />
  </main>
);

export default App;
