const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "http://18.143.102.131:8080",
    NEXT_PUBLIC_TESTGZP_URL: "http://18.143.102.131:8080",
  },
  trailingSlash: true,
  output: 'export'
};

module.exports = nextConfig;