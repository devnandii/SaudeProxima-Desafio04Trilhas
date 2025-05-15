import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async (req, res) => {
  const { lat, lng, raio = 5000 } = req.query;
  
  try {
    const { rows } = await pool.query(`
      SELECT 
        nome,
        endereco,
        horario_funcionamento,
        telefone,
        ST_X(coordenadas) as lng,
        ST_Y(coordenadas) as lat,
        ST_Distance(
          coordenadas::GEOGRAPHY,
          ST_MakePoint($1, $2)::GEOGRAPHY
        ) as distancia
      FROM unidades_saude
      WHERE ST_DWithin(
        coordenadas::GEOGRAPHY,
        ST_MakePoint($1, $2)::GEOGRAPHY,
        $3
      )
      ORDER BY distancia
      LIMIT 20
    `, [lng, lat, raio]);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
