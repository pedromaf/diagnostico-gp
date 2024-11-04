export class AppConstants {
    public static readonly API_BASE_URL = 'https://api.example.com/';
    public static readonly MEDICAL_RECORDS_ENDPOINT = 'medicalrecord/';
    public static readonly MEDICAL_HISTORY_ENDPOINT = 'medicalrecord/{medicalRecordId}/medicalhistory';

    public static readonly ERROR_NETWORK = 'Ocorreu um erro ao tentar se comunicar com o servidor.';
    public static readonly ERROR_NOT_FOUND = 'Recurso não encontrado.';
    public static readonly ERROR_INVALID_FORM = 'É necessário preencher todos os campos obrigatórios \'*\'.';
    public static readonly ERROR_INVALID_DATE_FORMAT = 'O campo {fieldName} deve ser uma data válida no formato dd/mm/aaaa.';
    public static readonly ERROR_INVALID_PHONE_NUMBER = "É necessário fornecer um número de celular válido."
}