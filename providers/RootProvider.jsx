"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const AppProgressBar = dynamic(
  () => import("next-nprogress-bar").then((mod) => mod.AppProgressBar),
  {
    ssr: true,
  }
);
const SnackbarProvider = dynamic(
  () => import("notistack").then((mod) => mod.SnackbarProvider),
  {
    ssr: true,
  }
);

// const queryClient = new QueryClient();

const CustomRootProvider = ({ children, session }) => {
  //

  const [queryClient] = useState(() => new QueryClient());
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        {/* <SessionProvider session={session}> */}
        <AppProgressBar
          height="3px"
          color="#196FE0"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
        {/* </SessionProvider> */}
      </SnackbarProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </Suspense>
  );
};

export default CustomRootProvider;
