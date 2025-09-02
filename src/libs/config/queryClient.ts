import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

if (typeof window !== "undefined") {
  if (!window.__queryClient) {
    window.__queryClient = new QueryClient();
  }
  queryClient = window.__queryClient;
} else {
  queryClient = new QueryClient();
}

export default queryClient;

declare global {
  interface Window {
    __queryClient?: QueryClient;
  }
}
