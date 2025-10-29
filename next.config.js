/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ 忽略所有 TS 错误
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ 忽略 ESLint 报错
  },
};

module.exports = nextConfig;
