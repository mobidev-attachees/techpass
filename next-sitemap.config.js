/** @type {import('next-sitemap').IConfig} */
const fetchDynamicRoutes = async (apiPath) => {
    try {
      const baseUrl = 'http://localhost:3000'; // Adjust this if running in a different environment
      const response = await fetch(`${baseUrl}${apiPath}`);
  
      if (!response.ok) {
        console.error(`Failed to fetch ${apiPath}. Status: ${response.status}`);
        return []; // Return an empty array if the fetch fails
      }
  
      const data = await response.json();
  
      // Ensure the response is an array or extract it appropriately
      if (Array.isArray(data)) {
        return data;
      } else if (data.events && Array.isArray(data.events)) {
        return data.events;
      } else {
        console.error(`Unexpected API response format:`, data);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching routes from ${apiPath}:`, error.message);
      return []; // Return an empty array if an error occurs
    }
  };
  
  module.exports = {
    siteUrl: 'https://techpass-b8w7.vercel.app', // Replace with your actual domain
    generateRobotsTxt: true, // Generate robots.txt file
    generateIndexSitemap: false, // Disable index sitemap
    exclude: ['/api/*', '/protected/*'], // Exclude API and protected routes
    additionalPaths: async (config) => {
      // Fetch dynamic routes from your API
      const eventRoutes = await fetchDynamicRoutes('/api/events/getAllEvents'); // Adjust API path as needed
  
      // Map the fetched routes into sitemap format
      const eventPaths = eventRoutes.map((event) => ({
        loc: `/events/${event.id}`, // Replace with your route format
        lastmod: new Date().toISOString(),
      }));
  
      return eventPaths;
    },
  };
  