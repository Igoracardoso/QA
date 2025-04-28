from flask import jsonify, request

def update_location():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    if latitude and longitude:
        return jsonify({'success': True, 'message': 'Localização atualizada com sucesso'}), 200
    return jsonify({'success': False, 'message': 'Dados de GPS inválidos'}), 400
