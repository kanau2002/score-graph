/* eslint-disable @typescript-eslint/no-require-imports */
// test-connection.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv');
const { Pool } = require('pg');

// .env.localファイルの読み込み
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB,
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  console.log('Connection params:', {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT
  });
  
  try {
    const client = await pool.connect();
    console.log('Connected successfully to the database');
    const result = await client.query('SELECT NOW()');
    console.log('Current time from DB:', result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();