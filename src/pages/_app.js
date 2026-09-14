import "@/styles/globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Spinner from "@/components/common/spinner";

import { appWithTranslation } from "next-i18next/pages";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="lg" />
        </div>
      }>
        <Component {...pageProps} />
      </Suspense>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);