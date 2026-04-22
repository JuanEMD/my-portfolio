import "@/styles/globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

import { appWithTranslation } from "next-i18next/pages";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Suspense fallback={"Loading..."}>
        <Component {...pageProps} />
      </Suspense>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);