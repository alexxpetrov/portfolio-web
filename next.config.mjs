/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.ts$/,
        use: { loader: 'worker-loader' },
      });
    }

    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    return config;
  },
  experimental: {
    ppr: false,
    reactCompiler: true,
    dynamicIO: false,
    turbo: {
      resolveAlias: {
        underscore: 'lodash',
      },
    },
  },
};

export default nextConfig;
