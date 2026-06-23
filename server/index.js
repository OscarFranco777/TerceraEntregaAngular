const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Array en memoria de elementos JSON
let destinos = [
  { id: 1, nombre: 'París, Francia', imagenUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop', servicio: 'wifi', preferred: false, votos: 0 },
  { id: 2, nombre: 'Roma, Italia', imagenUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop', servicio: 'servicios', preferred: false, votos: 0 },
  { id: 3, nombre: 'Tokio, Japón', imagenUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop', servicio: 'piscina', preferred: false, votos: 0 }
];

// GET - Retornar el array de elementos
app.get('/api/destinos', (req, res) => {
  console.log('[API] GET /api/destinos - Devolviendo', destinos.length, 'destinos');
  res.json(destinos);
});

// POST - Agregar un elemento nuevo
app.post('/api/destinos', (req, res) => {
  const nuevoDestino = req.body;
  nuevoDestino.id = destinos.length > 0 ? Math.max(...destinos.map(d => d.id)) + 1 : 1;
  destinos.push(nuevoDestino);
  console.log('[API] POST /api/destinos - Agregado:', nuevoDestino.nombre, '(id:', nuevoDestino.id, ')');
  res.status(201).json({ success: true, destino: nuevoDestino, message: 'Destino agregado correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[API] Servidor Express corriendo en http://localhost:${PORT}`);
  console.log('[API] GET  http://localhost:3000/api/destinos');
  console.log('[API] POST http://localhost:3000/api/destinos');
});
