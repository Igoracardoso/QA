import pytest
from ..server import app
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_brake_alert(client):
    sensor_data = {'aceleração': -0.8, 'velocidade': 80}
    response = client.post('/api/sensor', json=sensor_data)
    assert response.status_code == 200
    assert response.get_json() == {
        'alert': 'Frenagem brusca detectada',
        'notification': True
    }

def test_normal_brake(client):
    sensor_data = {'aceleração': -0.3, 'velocidade': 50}
    response = client.post('/api/sensor', json=sensor_data)
    assert response.status_code == 200
    assert response.get_json() == {
        'alert': 'Frenagem normal',
        'notification': False
    }