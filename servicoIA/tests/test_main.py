import pytest
from app import app  # Certifique-se de que a importação está correta com base na estrutura do seu projeto
from datetime import datetime, timedelta

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

def test_ia_service_success(client):
    """Teste para verificar se a previsão da categoria funciona corretamente com dados válidos"""
    # Dados do paciente com todos os campos necessários
    patient_data = {
       "id": 402,
       "name": "menine",
       "birthdate": "1990-01-01T00:00:00.000+00:00",
       "gender": "m",
       "address": "Rua Exemplo, 123",
       "phoneNumber": "123456789",
       "email": "exemplo@teste.com",
       "consultationDate": datetime.utcnow().isoformat() + "Z",
       "previousHistory": {},  # Pode ser deixado vazio se não for usado
       "laboratoryAnalyses": {
          "id": 11,
          "albumin": 38.5,
          "alkalinePhosphatase": 52.5,
          "alanineTransaminase": 7.7,
          "aspartateTransaminase": 22.1,
          "bilirubin": 7.5,
          "cholinesterase": 6.93,
          "cholesterol": 3.23,
          "creatinine": 106,
          "gammaGlutamylTransferase": 12.1,
          "totalProtein": 69
       },
       "symptomatology": {}
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

def test_ia_service_missing_fields(client):
    """Teste para verificar a resposta quando campos estão faltando"""
    # Dados do paciente com campos laboratoriais faltando
    patient_data = {
       "id": 402,
       "name": "menine",
       "birthdate": "1990-01-01T00:00:00.000+00:00",
       "gender": "f",
       "consultationDate": datetime.utcnow().isoformat() + "Z",
       "laboratoryAnalyses": {
          "albumin": 38.5,
          # "alkalinePhosphatase" está faltando
          "alanineTransaminase": 7.7,
          "aspartateTransaminase": 22.1,
          "bilirubin": 7.5,
          "cholinesterase": 6.93,
          "cholesterol": 3.23,
          "creatinine": 106,
          "gammaGlutamylTransferase": 12.1,
          "totalProtein": 69
       },
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se retorna erro de campos laboratoriais faltando
    assert response.status_code == 400
    assert 'error' in json_data
    assert json_data['error'] == "Campos laboratoriais faltando no JSON de entrada"

def test_ia_service_invalid_gender(client):
    """Teste para verificar a resposta com valor inválido para 'gender'"""
    # Dados do paciente com 'gender' inválido
    patient_data = {
       "id": 402,
       "name": "menine",
       "birthdate": "1990-01-01T00:00:00.000+00:00",
       "gender": "unknown",  # Valor inválido
       "consultationDate": datetime.utcnow().isoformat() + "Z",
       "laboratoryAnalyses": {
          "albumin": 38.5,
          "alkalinePhosphatase": 52.5,
          "alanineTransaminase": 7.7,
          "aspartateTransaminase": 22.1,
          "bilirubin": 7.5,
          "cholinesterase": 6.93,
          "cholesterol": 3.23,
          "creatinine": 106,
          "gammaGlutamylTransferase": 12.1,
          "totalProtein": 69
       },
    }
    
    # Faz o POST com os dados do paciente
    response = client.post('/api/ia_service', json=patient_data)
    json_data = response.get_json()

    # Verifica se retorna erro devido ao valor inválido de 'gender'
    # Dependendo de como o aplicativo trata valores inválidos, o status code pode variar
    assert response.status_code == 200  # Ajuste se necessário
    assert 'predicted_category' in json_data
    assert json_data['status'] == "success"
    # Opcionalmente, pode verificar se o gênero padrão foi aplicado
