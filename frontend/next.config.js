/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  // Enable images from external domains if needed
  images: {
    domains: [],
  },
  env: {
    // Environment variables that will be available at build time
    API_URL: process.env.API_URL || "http://localhost:8080/api",
  },
};

module.exports = nextConfig;
