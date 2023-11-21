//@ts-check
const nextConfig = {
  redirects: async () => {
    return [{ source: '/', destination: '/auth/signin', statusCode: 301 }];
  },
};

module.exports = nextConfig;
