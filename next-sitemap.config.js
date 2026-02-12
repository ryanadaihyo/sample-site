/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // Replace with your project's actual public URL
    siteUrl: process.env.SITE_URL || 'https://culture-db-placeholder.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
};
