import pytest
from app.main import app

@pytest.fixture
def client():
    # Configura o Flask para testes
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello_world(client):
    """Teste para verificar se a rota raiz retorna 'Hello, World!'"""
    response = client.get('/')
    assert response.data == b'Hello, World!'



def test_patient_service(client):
    """Teste para verificar o processamento das informações do paciente"""
    # Envia um JSON contendo informações do paciente para o endpoint
    patient_data = {
        "nome": "João Silva",
        "cor": "Branca",
        "sexo": "Masculino",
        "doencas": ["Hipertensão", "Diabetes"]
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se o processamento está correto
    assert response.status_code == 200
    assert json_data['nome'] == "JOÃO SILVA"
    assert json_data['doencas'] == ["HIPERTENSÃO", "DIABETES"]
    assert json_data['status'] == "success"
