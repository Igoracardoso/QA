import pytest
from ..server import app
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_update_location(client):
    gps_data = {'latitude': -23.5505, 'longitude': -46.6333}
    response = client.post('/api/gps', json=gps_data)
    assert response.status_code == 200
    assert response.get_json() == {
        'success': True,
        'message': 'Localização atualizada com sucesso'
    }

def test_invalid_gps(client):
    response = client.post('/api/gps', json={'latitude': None, 'longitude': None})
    assert response.status_code == 400
    assert response.get_json() == {
        'success': False,
        'message': 'Dados de GPS inválidos'
    }
