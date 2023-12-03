//@ts-check
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://127.0.0.1:1337/uploads/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
