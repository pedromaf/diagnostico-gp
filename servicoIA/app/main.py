from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from datetime import datetime

# Inicializa a aplicação Flask
app = Flask(__name__)

# Definir caminho absoluto para os arquivos do modelo
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'modelo_rf.joblib')
SCALER_PATH = os.path.join(BASE_DIR, 'models', 'scaler.joblib')
LE_PATH = os.path.join(BASE_DIR, 'models', 'label_encoder.joblib')

# Carrega o modelo e os objetos de pré-processamento
try:
    modelo = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    le = joblib.load(LE_PATH)
except FileNotFoundError as e:
    print(f"Erro ao carregar os arquivos do modelo: {e}")
    modelo = None
    scaler = None
    le = None

# Rota básica para verificar se o servidor está funcionando
@app.route("/")
def hello_world():
    return "Hello, World!"

# Função para calcular a idade a partir da data de nascimento e data de consulta
def calculate_age(birthdate_str, consultation_date_str):
    birthdate = datetime.fromisoformat(birthdate_str.replace("Z", "+00:00"))
    consultation_date = datetime.fromisoformat(consultation_date_str.replace("Z", "+00:00"))
    age = consultation_date.year - birthdate.year - ((consultation_date.month, consultation_date.day) < (birthdate.month, birthdate.day))
    return age

# Função para mapear o gênero para o formato esperado pelo modelo
def map_gender(gender_str):
    # Exemplo de mapeamento: ajuste conforme necessário
    gender_map = {
        "m": 0,
        "f": 1,
        # Adicione outros mapeamentos se necessário
    }
    return gender_map.get(gender_str.lower(), 0)  # Default para 0 se não encontrado

# Função para processar dados do paciente
def ia_processing_patient(features):
    # Converte para numpy array e escala
    features = np.array(features).reshape(1, -1)
    features_scaled = scaler.transform(features)
    
    # Faz a previsão
    prediction = modelo.predict(features_scaled)
    category = le.inverse_transform(prediction)[0]
    
    return {
        'predicted_category': category,
        'status': 'success'
    }

# Rota para o serviço de IA que recebe dados via POST
@app.route('/api/ia_service', methods=['POST'])
def ia_service():
    try:
        # Recebe o JSON do request
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'JSON vazio ou inválido'}), 400
        
        # Extrai datas para calcular a idade
        birthdate = data.get('birthdate')
        consultation_date = data.get('consultationDate')
        if not birthdate or not consultation_date:
            return jsonify({'error': 'Campos "birthdate" ou "consultationDate" faltando'}), 400
        
        # Calcula a idade
        age = calculate_age(birthdate, consultation_date)
        
        # Mapeia o gênero
        gender = data.get('gender')
        sex = map_gender(gender)
        
        # Extrai os valores das análises laboratoriais
        laboratory = data.get('laboratoryAnalyses', {})
        required_lab_fields = {
            'ALB': laboratory.get('albumin'),
            'ALP': laboratory.get('alkalinePhosphatase'),
            'ALT': laboratory.get('alanineTransaminase'),
            'AST': laboratory.get('aspartateTransaminase'),
            'BIL': laboratory.get('bilirubin'),
            'CHE': laboratory.get('cholinesterase'),
            'CHOL': laboratory.get('cholesterol'),
            'CREA': laboratory.get('creatinine'),
            'GGT': laboratory.get('gammaGlutamylTransferase'),
            'PROT': laboratory.get('totalProtein')
        }
        
        # Verifica se todos os campos laboratoriais necessários estão presentes
        if not all(value is not None for value in required_lab_fields.values()):
            return jsonify({'error': 'Campos laboratoriais faltando no JSON de entrada'}), 400
        
        # Prepara as features para o modelo
        features = [
            age,
            sex,
            required_lab_fields['ALB'],
            required_lab_fields['ALP'],
            required_lab_fields['ALT'],
            required_lab_fields['AST'],
            required_lab_fields['BIL'],
            required_lab_fields['CHE'],
            required_lab_fields['CHOL'],
            required_lab_fields['CREA'],
            required_lab_fields['GGT'],
            required_lab_fields['PROT']
        ]
        
        # Processa os dados e faz a previsão
        result = ia_processing_patient(features)
        
        return jsonify(result), 200

    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({'error': str(e)}), 400

# Executa a aplicação Flask e define uma porta específica (por exemplo, porta 5000)
if __name__ == '__main__':
    if modelo and scaler and le:
        app.run(debug=False, host='0.0.0.0', port=5000)
    else:
        print("Modelo, scaler ou label encoder não foram carregados corretamente. Verifique os arquivos.")
