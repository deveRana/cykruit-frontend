/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // add any other external domains you need
    ],
  },
};

module.exports = nextConfig;
