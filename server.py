from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/gps', methods=['POST'])
def handle_gps():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    if latitude and longitude:
        return jsonify({'success': True, 'message': 'Localização atualizada com sucesso'}), 200
    return jsonify({'success': False, 'message': 'Dados de GPS inválidos'}), 400

@app.route('/api/sensor', methods=['POST'])
def handle_sensor():
    data = request.get_json()
    aceleracao = data.get('aceleração')
    velocidade = data.get('velocidade')
    if aceleracao is not None and velocidade is not None and aceleracao < -0.5 and velocidade > 60:
        return jsonify({'alert': 'Frenagem brusca detectada', 'notification': True}), 200
    return jsonify({'alert': 'Frenagem normal', 'notification': False}), 200

@app.route('/api/geofence', methods=['POST'])
def handle_geofence():
    data = request.get_json()
    area = data.get('area')
    if area == 'proibida':
        return jsonify({'notification': True, 'message': 'Veículo entrou em área restrita'}), 200
    return jsonify({'notification': False, 'message': 'Área permitida'}), 200

if __name__ == '__main__':
    app.run(port=3000)