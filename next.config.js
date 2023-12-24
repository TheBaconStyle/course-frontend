//@ts-check
// /** @type {import("next").NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://127.0.0.1:1337/uploads/:path*',
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        '127.0.0.1:3000',
        'localhost:3000',
        '31sl7pdj-3000.euw.devtunnels.ms',
      ],
    },
  },
};

module.exports = nextConfig;
