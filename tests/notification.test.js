// /backend/tests/notification.test.js
const request = require('supertest');
const app = require('../server');  // Importando o servidor principal

describe('Teste de Notificação em Tempo Real', () => {
  it('deve enviar uma notificação quando o veículo entrar em área restrita', async () => {
    const geofenceData = { latitude: -23.5505, longitude: -46.6333, area: 'proibida' };  // Dados da área restrita

    const res = await request(app)
      .post('/api/geofence')  // URL da API para a geofence
      .send(geofenceData)
      .expect('Content-Type', /json/)
      .expect(200);  // Espera o status 200

    // Verifica se a notificação foi enviada
    expect(res.body.notification).toBe(true);
    expect(res.body.message).toBe('Veículo entrou em área restrita');
  });
});
