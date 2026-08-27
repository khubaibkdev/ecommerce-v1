import type { NextConfig } from "next";

// Set TUNNEL_ORIGIN in .env to the current public tunnel URL (e.g. an ngrok
// forwarding URL) to allow the dev server and Server Actions to be reached
// through it. Only the hostname is needed by Next's allow-lists below.
const tunnelHostname = process.env.TUNNEL_ORIGIN
    ? new URL(process.env.TUNNEL_ORIGIN).hostname
    : undefined;

const nextConfig: NextConfig = {
    allowedDevOrigins: tunnelHostname ? [tunnelHostname] : undefined,
    experimental: {
        serverActions: {
            allowedOrigins: tunnelHostname ? [tunnelHostname] : undefined,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
