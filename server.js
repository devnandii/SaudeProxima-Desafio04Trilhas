require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: [
    'http://localhost:5500',
    'https://saude-proxima-desafio04-trilhas.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos

// Conexão com o banco Neon.tech
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Endpoints da API
app.get('/api/tipos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nome FROM tipo_unidade ORDER BY nome');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/especialidades', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nome FROM servicos ORDER BY nome');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/unidades', async (req, res) => {
  try {
    const { lat, lng, tipo, especialidade } = req.query;
    
    let query = `
      SELECT u.id, u.nome, u.endereco, u.telefone,
      ST_X(u.coordenadas) as longitude, 
      ST_Y(u.coordenadas) as latitude
      FROM unidades_saude u
    `;

    const whereClauses = [];
    const params = [];

    if (tipo) {
      whereClauses.push('u.tipo_id = $' + (params.length + 1));
      params.push(tipo);
    }

    if (especialidade) {
      query += ' JOIN unidade_servico us ON u.id = us.unidade_id';
      whereClauses.push('us.servico_id = $' + (params.length + 1));
      params.push(especialidade);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' LIMIT 10';

    const { rows } = await pool.query(query, params);
    res.json(rows);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
