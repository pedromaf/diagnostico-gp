# Usar uma imagem base oficial do Python
FROM python:3.11-slim

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instalar as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 5000

# Comando para executar a aplicação Flask usando Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app.main:app"]
