import { Pool } from 'pg';

// Configuração do Neon.tech
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export default async (req, res) => {
  const { endereco } = req.query;

  try {
    // 1. Geocodificação: Converter endereço em lat/long (ex: usar Google Maps API)
    // (Para simplificar, vamos supor que você já tem as coordenadas)
    const userLat = -12.1234;
    const userLng = -38.5678;

    // 2. Buscar unidades em um raio de 5 km
    const { rows } = await pool.query(`
      SELECT 
        *,
        ST_Distance(coordenadas, ST_GeogFromText('POINT(${userLng} ${userLat})')) AS distancia
      FROM unidades
      WHERE ST_DWithin(
        coordenadas,
        ST_GeogFromText('POINT(${userLng} ${userLat})'),
        5000 -- Raio em metros
      )
      ORDER BY distancia;
    `);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
};