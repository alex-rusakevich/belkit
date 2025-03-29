import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*/",
      },
      {
        source: "/admin/:path*",
        destination: "http://localhost:8000/admin/:path*/",
      },
      {
        source: "/media/:path*",
        destination: "http://localhost:8000/media/:path*/",
      },
      {
        source: "/static/:path*",
        destination: "http://localhost:8000/static/:path*/",
      },
      {
        source: "/sitemap.xml",
        destination: "http://localhost:8000/sitemap.xml",
      },
    ];
  },
};

module.exports = nextConfig;