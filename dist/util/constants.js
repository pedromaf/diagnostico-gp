export class AppConstants {
}
AppConstants.BASE_URL = 'http://localhost:5500/';
AppConstants.HISTORICO_PATH = "app/historico/historico.html";
AppConstants.PRONTUARIO_PATH = "app/prontuario/prontuario.html";
AppConstants.API_BASE_URL = 'http://localhost:55999/api';
AppConstants.MEDICAL_RECORDS_ENDPOINT = 'medicalRecord/';
AppConstants.PREVIOUS_HISTORY_ENDPOINT = 'medicalRecord/{medicalRecordId}/previousHistory';
AppConstants.ERROR_NETWORK = 'Ocorreu um erro ao tentar se comunicar com o servidor.';
AppConstants.ERROR_NOT_FOUND = 'Recurso não encontrado.';
AppConstants.ERROR_INVALID_FORM = 'É necessário preencher todos os campos obrigatórios \'*\'.';
AppConstants.ERROR_INVALID_DATE_FORMAT = 'O campo {fieldName} deve ser uma data válida no formato dd/mm/aaaa.';
AppConstants.ERROR_INVALID_PHONE_NUMBER = "É necessário fornecer um número de celular válido.";
AppConstants.ERROR_INVALID_EMAIL_FORMAT = "É necessário fornecer um email válido.";
AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED = "É necessário criar um prontuário para acessar esta página.";
AppConstants.IN_USE_MEDICAL_RECORD = "inUseMedicalRecord";
