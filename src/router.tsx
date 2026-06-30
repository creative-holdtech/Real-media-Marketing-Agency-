import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Lenis + ScrollResetOnNavigate handle scroll; built-in restoration scrolls too early during pending navigations.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
