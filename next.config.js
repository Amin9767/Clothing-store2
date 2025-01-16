/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },

      {
        protocol: "https",

        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",

        hostname: "placeimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
