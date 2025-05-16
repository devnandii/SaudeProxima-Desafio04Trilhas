import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: true
});

export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const { rows } = await pool.query('SELECT id, nome FROM servicos ORDER BY nome');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
