const express = require('express');
const Fuse = require('fuse.js');
const cors = require('cors');
const data = require('./data.json');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Search Index
// This mimics the 'Search Index' DB in the CQRS diagram.
// Using an in-memory fuzzy search (Fuse.js) saves cloud costs (no separate Elasticsearch pod needed).
const fuseOptions = {
  keys: ['title', 'description', 'category', 'tags'],
  threshold: 0.3, // 0.0 is exact match, 1.0 is matches everything
};
const searchIndex = new Fuse(data, fuseOptions);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root health check for GCP Load Balancer
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Main Search Endpoint (Mimics the 'Search API' hexagon)
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  
  // If no query string provided, return all catalogs
  if (!query) {
    return res.json({
      results: data,
      count: data.length,
      message: "Fetched all catalogs"
    });
  }

  // Execute fuzzy search against the index
  const fuseResults = searchIndex.search(query);
  const results = fuseResults.map(result => result.item);

  res.json({
    results: results,
    count: results.length,
    message: `Search results for: ${query}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Minimal Search API running on port ${PORT}`);
  console.log(`In-memory search index initialized with ${data.length} records.`);
});
