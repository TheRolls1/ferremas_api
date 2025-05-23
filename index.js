const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const verifyToken = require('./middleware/auth');
const axios = require('axios');

app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('API FERREMAS funcionando correctamente');
});

// Ruta protegida con token
app.get('/productos', verifyToken, (req, res) => {
  res.json([
    { id: 1, nombre: 'Taladro', precio: 49990 },
    { id: 2, nombre: 'Martillo', precio: 7990 }
  ]);
});

// Ruta para obtener productos desde API de FERREMAS
app.get('/ferremas/productos', async (req, res) => {
  try {
    const response = await axios.get('https://ea2p2assets-production.up.railway.app/assets', {
      headers: {
        'Authorization': 'Bearer SaGrP9ojGS39hU9ljqbXxQ=='
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con API FERREMAS' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
