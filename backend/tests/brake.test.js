// /backend/tests/brake.test.js
const request = require('supertest');
const app = require('../server');  // Importando o servidor principal

describe('Teste de Detecção de Frenagem Brusca', () => {
  it('deve gerar alerta quando a frenagem brusca for detectada', async () => {
    const sensorData = { aceleração: -0.8, velocidade: 80 };  // Dados do sensor simulados

    const res = await request(app)
      .post('/api/sensor')  // URL da API para receber os dados do sensor
      .send(sensorData)
      .expect('Content-Type', /json/)
      .expect(200);  // Espera que o status seja 200 OK

    // Verifica se o alerta de frenagem foi gerado
    expect(res.body.alert).toBe('Frenagem brusca detectada');
    expect(res.body.notification).toBe(true);  // Espera que a notificação tenha sido enviada
  });
});
