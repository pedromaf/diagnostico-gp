from flask import Flask, request, jsonify

# Inicializa a aplicação Flask
app = Flask(__name__)

# Rota básica para verificar se o servidor está funcionando
@app.route("/")
def hello_world():
    return "Hello, World!"

# Função para processar dados do paciente
def ia_processing_patient(data):
    nome = data.get('nome', '').upper()
    data_nascimento = data.get('data_nascimento', '')
    cor = data.get('cor', '').capitalize()
    sexo = data.get('sexo', '').capitalize()
    doencas = [doenca.upper() for doenca in data.get('doencas', [])]


    # Retorna os dados processados
    return {
        'nome': nome,
        'cor': cor,
        'sexo': sexo,
        'doencas': doencas,
        'status': 'success'
    }

# Rota para o serviço de IA que recebe dados via POST
@app.route('/api/ia_service', methods=['POST'])
def ia_service():
    try:
        # Recebe o JSON do request
        data = request.get_json()

        # Acessa um campo específico do JSON (ajuste conforme necessário)
        input_text = data.get('input_text', '')

        # Processa os dados recebidos pela função de IA
        result = ia_processing_patient(data)

       
        return jsonify(result), 200

    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({'error': str(e)}), 400

# Executa a aplicação Flask e define uma porta específica (por exemplo, porta 5001)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
