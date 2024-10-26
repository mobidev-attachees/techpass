/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables support for environment variables from .env files
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE,
  },
  // Specifies custom headers for the API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  // Example of a custom redirect, if necessary
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  // Example of a custom rewrite, if necessary
  async rewrites() {
    return [
      {
        source: '/custom-api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // Configure image domains
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
  },
};

export default nextConfig;
