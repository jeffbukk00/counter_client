import { HasChildren } from "@/shared/types";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

const TanstackQueryProvider = ({ children }: HasChildren) => {
  const queryClientOptions: QueryClientConfig = {};
  const queryClient = new QueryClient(queryClientOptions);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
