/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["nurjazkg.ru"], // Add external domains for images
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Handle .svg files as React components
      use: ["@svgr/webpack"],
    });
    return config; // Return the modified configuration
  },
};

export default nextConfig;
