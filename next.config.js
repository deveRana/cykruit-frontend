/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // existing domain
      "cykruit-job-seeker-profile-images.s3.eu-north-1.amazonaws.com", // add your S3 bucket
    ],
  },
};

module.exports = nextConfig;
