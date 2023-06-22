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
    NEXT_PUBLIC_BASE_URL: "http://18.143.102.131:8080",
    // NEXT_PUBLIC_BEANOI_URL: "https://api.beanoi.com/api",
    NEXT_PUBLIC_TESTGZP_URL: "http://18.143.102.131:8080",
  },
  async headers(){
    return [
      {
        source: "/*",
        headers:[
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests"
          },
        ],
      },
    ]
  },
  trailingSlash: true,
  output: 'export'
};

module.exports = nextConfig;
