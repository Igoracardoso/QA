// /backend/server.js
const express = require('express');
const app = express();

// Middleware para parsing do corpo da requisição
app.use(express.json());

// Simula uma rota para os testes de GPS
app.post('/api/gps', (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude && longitude) {
    return res.status(200).json({ success: true, message: 'Localização atualizada com sucesso' });
  }
  return res.status(400).json({ success: false, message: 'Dados de GPS inválidos' });
});

// Simula uma rota para os testes de frenagem
app.post('/api/sensor', (req, res) => {
  const { aceleração, velocidade } = req.body;
  if (aceleração < -0.5 && velocidade > 60) {
    return res.status(200).json({ alert: 'Frenagem brusca detectada', notification: true });
  }
  return res.status(200).json({ alert: 'Frenagem normal', notification: false });
});

// Simula uma rota para os testes de geofence
app.post('/api/geofence', (req, res) => {
  const { latitude, longitude, area } = req.body;
  if (area === 'proibida') {
    return res.status(200).json({ notification: true, message: 'Veículo entrou em área restrita' });
  }
  return res.status(200).json({ notification: false, message: 'Área permitida' });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

module.exports = app;
