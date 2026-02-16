import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/a.storyblok.com/**",
      },
      {
        protocol: "https",
        hostname: "www.tiq.qld.gov.au",
      },
    ],
  },
};

export default nextConfig;
