const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /sitemap.xml
router.get('/sitemap.xml', async (req, res) => {
  const baseUrl = process.env.CLIENT_ORIGIN || 'https://buildconnectncr.com';

  const staticPages = [
    '',
    '/services',
    '/services/material-plus-labour',
    '/services/labour-only',
    '/projects',
    '/cost-calculator',
    '/locations/noida',
    '/locations/greater-noida',
    '/about',
    '/contact',
    '/privacy-policy',
  ];

  let projectSlugs = [];
  try {
    const projects = await Project.find({ isPublished: true }, 'slug updatedAt');
    projectSlugs = projects.map((p) => `/projects/${p.slug}`);
  } catch (e) {
    projectSlugs = [
      '/projects/luxury-villa-sector-150-noida',
      '/projects/independent-house-greater-noida-west',
      '/projects/modern-duplex-alpha-1-greater-noida',
    ];
  }

  const allUrls = [...staticPages, ...projectSlugs];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// GET /robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.CLIENT_ORIGIN || 'https://buildconnectncr.com';
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

module.exports = router;
