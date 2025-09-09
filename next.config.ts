/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 🔥 Required for static export when using <Image>
  },
  reactStrictMode: false, // Disable React Strict Mode in development
};

export default nextConfig;
