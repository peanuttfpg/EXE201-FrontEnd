/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "https://stg-api-blogpost.reso.vn/api",
    NEXT_PUBLIC_BEANOI_URL: "https://api.beanoi.com/api",
    NEXT_PUBLIC_TESTGZP_URL: "https://stg-api.beanoi.com/api",
  },
  trailingSlash: true,
}

module.exports = nextConfig
