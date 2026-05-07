/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
