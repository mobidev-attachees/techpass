const fetch = require('node-fetch');

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://techpass-b8w7.vercel.app', // Replace with your actual domain
  generateRobotsTxt: true, // Generates robots.txt
  exclude: ['/auth/*', '/protected/*'], // Exclude private or protected routes
  additionalPaths: async (config) => {
    // Fetch dynamic routes from your API endpoints
    const eventRoutes = await fetchDynamicRoutes('/api/events/getAllEvents'); // Adjust based on your API path
    const singleEventRoutes = await fetchDynamicRoutes('/api/event'); // Adjust if `/api/event/[id]` is dynamic

    return [
      ...eventRoutes.map((route) => ({
        loc: `/events/${route.id}`, // Adjust path structure based on your routes
        lastmod: new Date().toISOString(),
      })),
      ...singleEventRoutes.map((route) => ({
        loc: `/event/${route.id}`, // Dynamic single event routes
        lastmod: new Date().toISOString(),
      })),
    ];
  },
};

async function fetchDynamicRoutes(apiPath) {
  try {
    const response = await fetch(`https://techpass-b8w7.vercel.app${apiPath}`);
    if (!response.ok) throw new Error(`Failed to fetch routes from ${apiPath}`);
    const data = await response.json();
    return data; // Adjust to match your API response structure
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = config;
