export class AppConstants {
    public static readonly BASE_URL = 'http://localhost:5500/';
    public static readonly HISTORICO_PATH = "app/historico/historico.html"
    public static readonly PRONTUARIO_PATH = "app/prontuario/prontuario.html"
    public static readonly LABORATORIO_PATH = "app/laboratorio/laboratorio.html"
    public static readonly SINTOMATOLOGIA_PATH = "app/sintomatologia/sintomatologia.html"
    public static readonly DIAGNOSTICO_PATH = "app/diagnostico/diagnostico.html"

    public static readonly API_BASE_URL = 'http://localhost:55999/api';
    public static readonly MEDICAL_RECORDS_ENDPOINT = 'medicalRecord/';
    public static readonly PREVIOUS_HISTORY_ENDPOINT = 'medicalRecord/{medicalRecordId}/previousHistory';
    public static readonly LABOATORY_ANALYSES_ENDPOINT = 'medicalRecord/{medicalRecordId}/laboratoryAnalyses';
    public static readonly SYMPTOMATOLOGY_ENDPOINT = 'medicalRecord/{medicalRecordId}/symptomatology';
    public static readonly PATIENT_DATA_ENDPOINT = 'medicalRecord/{medicalRecordId}/simplified';

    public static readonly ERROR_NETWORK = 'Ocorreu um erro ao tentar se comunicar com o servidor.';
    public static readonly ERROR_NOT_FOUND = 'Recurso não encontrado.';
    public static readonly ERROR_INVALID_FORM = 'É necessário preencher todos os campos obrigatórios \'*\'.';
    public static readonly ERROR_INVALID_DATE_FORMAT = 'O campo {fieldName} deve ser uma data válida no formato dd/mm/aaaa.';
    public static readonly ERROR_INVALID_PHONE_NUMBER = "É necessário fornecer um número de celular válido."
    public static readonly ERROR_INVALID_EMAIL_FORMAT = "É necessário fornecer um email válido."
    public static readonly NO_MEDICAL_RECORD_ID_PROVIDED = "É necessário criar um prontuário para acessar esta página."
    public static readonly ERROR_NO_SYMPTOM_SELECTED = 'É necessário selecionar pelo menos um sintoma.';
    public static readonly ERROR_INCOMPLETE_SYMPTOM_FIELDS = 'É necessário preencher a duração e a gravidade para todos os sintomas selecionados.';

    public static readonly IN_USE_MEDICAL_RECORD = "inUseMedicalRecord";
}