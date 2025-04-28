// /backend/tests/gps.test.js
const request = require('supertest');
const app = require('../server');  // Importando o servidor principal

describe('Teste de Recebimento de Dados GPS', () => {
  it('deve atualizar a localização do veículo no mapa', async () => {
    const gpsData = { latitude: -23.5505, longitude: -46.6333 };  // Dados GPS simulados

    const res = await request(app)
      .post('/api/gps')  // URL da API que deve receber os dados
      .send(gpsData)     // Envia os dados GPS
      .expect('Content-Type', /json/)
      .expect(200);      // Espera que o retorno seja um JSON e o status seja 200

    // Verifica se o retorno contém as chaves esperadas
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Localização atualizada com sucesso');
  });
});
