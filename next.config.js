/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove any eslint-related configurations if they exist
  images: {
    domains: ['localhost', '127.0.0.1'],
    // Add your production domain here when deploying to production
    // Example: 'api.yourdomain.com'
    unoptimized: true, // Disable image optimization for external images
  },
};

module.exports = nextConfig;
