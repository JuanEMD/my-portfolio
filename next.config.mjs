import i18nConfig from "./next-i18next.config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
