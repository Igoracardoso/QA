import pytest
from ..server import app
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_restricted_area(client):
    geofence_data = {'latitude': -23.5505, 'longitude': -46.6333, 'area': 'proibida'}
    response = client.post('/api/geofence', json=geofence_data)
    assert response.status_code == 200
    assert response.get_json() == {
        'notification': True,
        'message': 'Veículo entrou em área restrita'
    }

def test_allowed_area(client):
    geofence_data = {'latitude': -23.5505, 'longitude': -46.6333, 'area': 'permitida'}
    response = client.post('/api/geofence', json=geofence_data)
    assert response.status_code == 200
    assert response.get_json() == {
        'notification': False,
        'message': 'Área permitida'
    }
