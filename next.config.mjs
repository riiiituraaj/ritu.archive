/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Avoid a Windows dev-server manifest corruption path in Next's Segment Explorer.
    devtoolSegmentExplorer: false,
  },
};
export default nextConfig;
