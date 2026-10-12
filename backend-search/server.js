const express = require('express');
const Fuse = require('fuse.js');
const cors = require('cors');
const data = require('./data.json');
const { BigQuery } = require('@google-cloud/bigquery');
const { Spanner } = require('@google-cloud/spanner');
const crypto = require('crypto');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Leave existing cross-origin behavior unchanged until an allowlist is configured.
// Set CORS_ORIGINS to comma-separated exact origins when the API has a known web client.
app.use(cors(allowedOrigins.length ? { origin: allowedOrigins } : undefined));
app.use(express.json({ limit: '10kb' }));

const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'demos-490411';

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

const allowedYears = new Set([
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Graduated',
]);

function validateEnrollment(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'A JSON object is required.' };
  }

  const fields = ['name', 'email', 'phone', 'college'];
  const values = {};

  for (const field of fields) {
    if (typeof body[field] !== 'string') {
      return { error: `\${field} must be a string.` };
    }
    values[field] = body[field].trim();
    if (!values[field] || values[field].length > 200) {
      return { error: `\${field} must contain 1 to 200 characters.` };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) {
    return { error: 'email must be a valid email address.' };
  }

  const phoneDigits = values.phone.replace(/\D/g, '');
  if (!/^[+()\d\s.-]+$/.test(values.phone) || phoneDigits.length < 7 || phoneDigits.length > 20) {
    return { error: 'phone must contain between 7 and 20 digits.' };
  }

  if (typeof body.year !== 'string' || !allowedYears.has(body.year)) {
    return { error: 'year must be one of the supported enrollment years.' };
  }
  values.year = body.year;

  return { values };
}

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
  const { values, error } = validateEnrollment(req.body);
  if (error) {
    return res.status(400).json({ success: false, error });
  }

  try {
    const enrollmentId = crypto.randomInt(1, 1_000_000_000);
    const timestamp = new Date().toISOString();
    const { name, email, phone, college, year } = values;

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
        enrolled_at: 'spanner.commit_timestamp()'
      }
    ]);

    // Wait for both to finish
    await Promise.all([bqPromise, spannerPromise]);

    console.log(`Successfully enrolled \${email} in BigQuery and Spanner.`);
    return res.status(200).json({ success: true, message: 'Enrollment successful!' });
  } catch (error) {
    console.error('ERROR during enrollment:', error);
    return res.status(500).json({ success: false, error: 'Failed to process enrollment' });
  }
});

// Main Search Endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({
      results: data,
      count: data.length,
      message: 'Fetched all catalogs'
    });
  }

  if (typeof query !== 'string' || query.length > 200) {
    return res.status(400).json({ error: 'q must be a string no longer than 200 characters.' });
  }

  const fuseResults = searchIndex.search(query);
  const results = fuseResults.map((result) => result.item);

  return res.json({
    results,
    count: results.length,
    message: `Search results for: \${query}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Search API with Spanner & BigQuery running on port \${PORT}`);
});
