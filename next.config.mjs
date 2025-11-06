/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "somnia-avatar-v2-view-prod-dot-metaverse-browser-422108.uc.r.appspot.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
