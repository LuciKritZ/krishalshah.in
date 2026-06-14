/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        source: String.raw`/(.*\.(?:png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|otf|mp4|webm|ico))`,
      },
    ];
  },
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
