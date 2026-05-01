const express = require('express');
const Fuse = require('fuse.js');
const cors = require('cors');
const data = require('./data.json');
const { BigQuery } = require('@google-cloud/bigquery');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: 'demos-490411'
});

// Initialize Search Index
const fuseOptions = {
  keys: ['title', 'description', 'category', 'tags'],
  threshold: 0.3,
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

// Enrollment Endpoint (Dumps data to BigQuery)
app.post('/api/enroll', async (req, res) => {
  try {
    const { name, email, phone, college, year } = req.body;
    
    // Construct the row to insert
    const row = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      phone: phone,
      college: college,
      year: year,
      enrolled_at: new Date().toISOString()
    };

    // Insert into BigQuery table
    await bigquery
      .dataset('industrial_training_ds')
      .table('enrollment_data')
      .insert([row]);

    console.log(`Inserted enrollment for ${email} into BigQuery.`);
    res.status(200).json({ success: true, message: 'Enrollment successful!' });
  } catch (error) {
    console.error('ERROR inserting into BigQuery:', error);
    res.status(500).json({ success: false, error: 'Failed to process enrollment' });
  }
});

// Main Search Endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.json({
      results: data,
      count: data.length,
      message: "Fetched all catalogs"
    });
  }

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
