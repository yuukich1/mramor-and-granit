import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
};

export default nextConfig;
