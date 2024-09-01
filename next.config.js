/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["scorecard-types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.scorecardgrades.com",
        port: "",
        pathname: "/v1/images/get/*",
      },
    ],
  },
};
