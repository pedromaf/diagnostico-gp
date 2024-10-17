from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

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

# Função para processar dados do paciente
def ia_processing_patient(data):
    # Extrai os dados necessários
    features = [
        data.get('Age'),
        0 if data.get('Sex') == 'm' else 1,  # Assume 'm' ou 'f'
        data.get('ALB'),
        data.get('ALP'),
        data.get('ALT'),
        data.get('AST'),
        data.get('BIL'),
        data.get('CHE'),
        data.get('CHOL'),
        data.get('CREA'),
        data.get('GGT'),
        data.get('PROT')
    ]
    
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
        
        # Verifica se todos os campos necessários estão presentes
        required_fields = ['Age', 'Sex', 'ALB', 'ALP', 'ALT', 'AST', 'BIL', 'CHE', 'CHOL', 'CREA', 'GGT', 'PROT']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Campos faltando no JSON de entrada'}), 400
        
        # Processa os dados e faz a previsão
        result = ia_processing_patient(data)
        
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
