const express = require('express');
const Fuse = require('fuse.js');
const cors = require('cors');
const data = require('./data.json');
const { BigQuery } = require('@google-cloud/bigquery');
const { Spanner } = require('@google-cloud/spanner');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const projectId = 'demos-490411';

// Initialize BigQuery client
const bigquery = new BigQuery({ projectId });

// Initialize Spanner client
const spanner = new Spanner({ projectId });
const instance = spanner.instance('devops-spanner-instance');
const database = instance.database('training-db');

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

// Enrollment Endpoint (Dumps data to BigQuery AND Spanner)
app.post('/api/enroll', async (req, res) => {
  try {
    const { name, email, phone, college, year } = req.body;
    const enrollmentId = Math.floor(Math.random() * 1000000000);
    const timestamp = new Date().toISOString();
    
    // Construct the row to insert
    const row = {
      id: enrollmentId,
      name,
      email,
      phone,
      college,
      year,
      enrolled_at: timestamp
    };

    // 1. Insert into BigQuery (For Analytics)
    const bqPromise = bigquery
      .dataset('industrial_training_ds')
      .table('enrollment_data')
      .insert([row]);

    // 2. Insert into Spanner (For Transactional/Production Records)
    const spannerTable = database.table('Enrollments');
    const spannerPromise = spannerTable.insert([
      {
        id: enrollmentId,
        name,
        email,
        phone,
        college,
        year,
        enrolled_at: 'spanner.commit_timestamp()' // Correct way to use commit timestamp
      }
    ]);

    // Wait for both to finish
    await Promise.all([bqPromise, spannerPromise]);

    console.log(`Successfully enrolled ${email} in BigQuery and Spanner.`);
    res.status(200).json({ success: true, message: 'Enrollment successful!' });
  } catch (error) {
    console.error('ERROR during enrollment:', error);
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
  console.log(`Search API with Spanner & BigQuery running on port ${PORT}`);
});
