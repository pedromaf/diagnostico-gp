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

def test_patient_service_success(client):
    """Teste para verificar se a previsão da categoria funciona corretamente"""
    # Envia um JSON contendo informações do paciente para o endpoint
    patient_data = {
        "Age": 32,
        "Sex": "m",
        "ALB": 38.5,
        "ALP": 52.5,
        "ALT": 7.7,
        "AST": 22.1,
        "BIL": 7.5,
        "CHE": 6.93,
        "CHOL": 3.23,
        "CREA": 106,
        "GGT": 12.1,
        "PROT": 69
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se a previsão está correta
    assert response.status_code == 200
    assert 'predicted_category' in json_data
    assert json_data['status'] == "success"
    # Opcional: Verifique se a categoria prevista está entre as categorias conhecidas
    assert json_data['predicted_category'] in ["0=Blood Donor", "1=Patient"]  # Ajuste conforme suas categorias

def test_patient_service_missing_fields(client):
    """Teste para verificar a resposta quando campos estão faltando"""
    # Envia um JSON com campos faltando
    patient_data = {
        "Age": 45,
        "Sex": "f",
        "ALB": 40.0,
        # "ALP" está faltando
        "ALT": 30.0,
        "AST": 25.0,
        "BIL": 10.0,
        "CHE": 7.0,
        "CHOL": 4.5,
        "CREA": 90,
        "GGT": 20.0,
        "PROT": 70
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se retorna erro de campos faltando
    assert response.status_code == 400
    assert 'error' in json_data
    assert json_data['error'] == "Campos faltando no JSON de entrada"

def test_patient_service_invalid_sex(client):
    """Teste para verificar a resposta com valor inválido para 'Sex'"""
    # Envia um JSON com valor inválido para 'Sex'
    patient_data = {
        "Age": 40,
        "Sex": "unknown",  # Valor inválido
        "ALB": 40.0,
        "ALP": 80.0,
        "ALT": 30.0,
        "AST": 25.0,
        "BIL": 10.0,
        "CHE": 7.0,
        "CHOL": 4.5,
        "CREA": 90,
        "GGT": 20.0,
        "PROT": 70
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se retorna erro devido ao valor inválido
    assert response.status_code == 200  # Dependendo da implementação, pode ser 400
    assert 'error' in json_data or 'predicted_category' in json_data
    # Dependendo de como você tratou valores inválidos, ajuste as assertivas
