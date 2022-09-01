/* eslint-disable turbo/no-undeclared-env-vars */
const withTM = require("next-transpile-modules")(["@kasey-turbo/ui-library"]);
const path = require("path");

const basePath = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return '';
  }
  let basePath = process.env.BASE_PATH;

  if (!basePath) {
    console.info('No process.env.BASE_PATH found... defaulting to root.');
    return '';
  }

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`Base Path: ${basePath}`);
  basePath = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return basePath;
})();

/**
 * Environment variables: https://nextjs.org/docs/basic-features/environment-variables
 */

/** Available on both the Client and the Server */
const publicRuntimeConfig = {
  canonicalUrl: process.env.NEXT_PUBLIC_API_URL
};

/** @type { import('next').NextConfig } */
const nextConfig = {
  basePath: basePath,
  assetPrefix: '/',
  publicRuntimeConfig,
  // serverRuntimeConfig,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  trailingSlash: false,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../")
  }
};

module.exports = withTM(nextConfig);
