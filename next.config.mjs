/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'images.gr-assets.com',
        port: '',
        pathname: '/authors/**',
      },
    ],
  },
};

export default nextConfig;
