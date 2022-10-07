/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTM = require("next-transpile-modules")(["scorecard-types"]);

module.exports = withTM(nextConfig);
