// /backend/src/controllers/GpsController.js
exports.updateLocation = (req, res) => {
    const { latitude, longitude } = req.body;
    // Lógica para processar os dados do GPS e atualizar a localização do veículo no mapa
    res.json({ success: true, message: 'Localização atualizada com sucesso' });
  };
  