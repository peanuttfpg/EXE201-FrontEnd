const { generateStaticParams } = require('next/dist/next-server/server/static-html');

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
  async generateBuildId() {
    // Custom logic for generating build ID if needed
    return 'your-custom-build-id';
  },
  async generateStaticParams() {
    const staticParams = await generateStaticParams({
      // Specify your page paths and their associated parameters here
      '/': {},
      // Add other pages/routes here
    });

    return staticParams;
  },
};

module.exports = nextConfig;