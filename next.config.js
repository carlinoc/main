/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cinergia.lat',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.ytimg.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;