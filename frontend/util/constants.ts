export class AppConstants {
    public static readonly BASE_URL = 'http://localhost:5500';
    public static readonly HISTORY_PATH = "app/historico/historico.html"

    public static readonly API_BASE_URL = 'http://localhost:55999/api';
    public static readonly MEDICAL_RECORDS_ENDPOINT = 'medicalRecord/';
    public static readonly MEDICAL_HISTORY_ENDPOINT = 'medicalRecord/{medicalRecordId}/medicalHistory';

    public static readonly ERROR_NETWORK = 'Ocorreu um erro ao tentar se comunicar com o servidor.';
    public static readonly ERROR_NOT_FOUND = 'Recurso não encontrado.';
    public static readonly ERROR_INVALID_FORM = 'É necessário preencher todos os campos obrigatórios \'*\'.';
    public static readonly ERROR_INVALID_DATE_FORMAT = 'O campo {fieldName} deve ser uma data válida no formato dd/mm/aaaa.';
    public static readonly ERROR_INVALID_PHONE_NUMBER = "É necessário fornecer um número de celular válido."
    public static readonly ERROR_INVALID_EMAIL_FORMAT = "É necessário fornecer um email válido."

    public static readonly IN_USE_MEDICAL_RECORD = "inUseMedicalRecord";
}