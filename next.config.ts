/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Thêm domain này
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // vẫn giữ nếu bạn muốn tất cả (không khuyến khích khi production)
      },
    ],
  },
};

module.exports = nextConfig;
