const nextConfig = {
  webpack: (config: any) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
export default nextConfig;