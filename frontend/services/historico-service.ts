import { AppConstants } from '../util/constants.js';
import { apiService } from './api-service.js';
import { MedicalRecord } from '../interfaces/medical-record.js';
import { PreviousHistory } from '../interfaces/previous-history.js';
import { GeneralConditions } from '../interfaces/general-conditions.js';
import { PatientAllergies } from '../interfaces/patient-allergies.js';
import { ClinicalHistory } from '../interfaces/clinical-history.js';
import { FamilyHistory } from '../interfaces/family-history.js';

const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');

if (!medicalRecordId) {
    alert(AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED);
    window.location.href = AppConstants.BASE_URL + AppConstants.PRONTUARIO_PATH;
}

const confirmButton = document.getElementById('confirmButton');
confirmButton?.addEventListener('click', confirmPreviousHistoryCreation);

async function confirmPreviousHistoryCreation() {
    var previousHistory: PreviousHistory = buildPreviousHistoryObject();

    try {
        const response = await apiService.put<MedicalRecord>(AppConstants.PREVIOUS_HISTORY_ENDPOINT.replace("{medicalRecordId}", medicalRecordId.toString()), previousHistory);

        if (response.error) {
            alert(response.error);
        } else {
           window.location.href = AppConstants.BASE_URL + "/" + AppConstants.LABORATORIO_PATH + "?medicalRecordId=" + medicalRecordId;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function buildPreviousHistoryObject(): PreviousHistory {
    var previousHistory: PreviousHistory = {} as PreviousHistory;

    var generalConditions: GeneralConditions = {
        smoker: (document.getElementById('fumante') as HTMLInputElement).checked,
        alcohol: (document.getElementById('alcool') as HTMLInputElement).checked
    };

    var patientAllergies: PatientAllergies = {
        milk: (document.getElementById('leite') as HTMLInputElement).checked,
        egg: (document.getElementById('ovo') as HTMLInputElement).checked,
        seafood: (document.getElementById('fmar') as HTMLInputElement).checked,
        peanutsNuts: (document.getElementById('AN') as HTMLInputElement).checked,
        aspirin: (document.getElementById('AAS') as HTMLInputElement).checked,
        penicillin: (document.getElementById('Pni') as HTMLInputElement).checked,
        nsaids: (document.getElementById('AINEs') as HTMLInputElement).checked,
        mites: (document.getElementById('acaros') as HTMLInputElement).checked,
        dust: (document.getElementById('poeira') as HTMLInputElement).checked,
        pollen: (document.getElementById('polen') as HTMLInputElement).checked,
        bees: (document.getElementById('abelha') as HTMLInputElement).checked,
        catsDogs: (document.getElementById('CG') as HTMLInputElement).checked
    };

    var clinicalHistory: ClinicalHistory = {
        diabetes: (document.getElementById('diabetes') as HTMLInputElement).checked,
        hypertension: (document.getElementById('hipertensao') as HTMLInputElement).checked,
        asthma: (document.getElementById('asma') as HTMLInputElement).checked,
        hypothyroidism: (document.getElementById('hipotireoidismo') as HTMLInputElement).checked,
        arthritis: (document.getElementById('artrite') as HTMLInputElement).checked,
        cancer: (document.getElementById('cancer') as HTMLInputElement).checked,
        depression: (document.getElementById('depressao') as HTMLInputElement).checked,
        kidneyDisease: (document.getElementById('doenca_renal') as HTMLInputElement).checked,
        hepatitis: (document.getElementById('hepatite') as HTMLInputElement).checked,
        tuberculosis: (document.getElementById('tuberculose') as HTMLInputElement).checked,
        anemia: (document.getElementById('anemia') as HTMLInputElement).checked,
        heartFailure: (document.getElementById('insuficiencia_cardiaca') as HTMLInputElement).checked,
        lungDisease: (document.getElementById('doenca_pulmonar') as HTMLInputElement).checked,
        alzheimer: (document.getElementById('alzheimer') as HTMLInputElement).checked,
        stroke: (document.getElementById('avc') as HTMLInputElement).checked,
        epilepsy: (document.getElementById('epilepsia') as HTMLInputElement).checked
    };

    var familyHistory: FamilyHistory = {
        diabetes: (document.getElementById('diabetes_f') as HTMLInputElement).checked,
        hypertension: (document.getElementById('hipertensao_f') as HTMLInputElement).checked,
        asthma: (document.getElementById('asma_f') as HTMLInputElement).checked,
        hypothyroidism: (document.getElementById('hipotireoidismo_f') as HTMLInputElement).checked,
        arthritis: (document.getElementById('artrite_f') as HTMLInputElement).checked,
        cancer: (document.getElementById('cancer_f') as HTMLInputElement).checked,
        depression: (document.getElementById('depressao_f') as HTMLInputElement).checked,
        kidneyDisease: (document.getElementById('doenca_renal_f') as HTMLInputElement).checked,
        hepatitis: (document.getElementById('hepatite_f') as HTMLInputElement).checked,
        tuberculosis: (document.getElementById('tuberculose_f') as HTMLInputElement).checked,
        anemia: (document.getElementById('anemia_f') as HTMLInputElement).checked,
        heartFailure: (document.getElementById('insuficiencia_cardiaca_f') as HTMLInputElement).checked,
        lungDisease: (document.getElementById('doenca_pulmonar_f') as HTMLInputElement).checked,
        alzheimer: (document.getElementById('alzheimer_f') as HTMLInputElement).checked,
        stroke: (document.getElementById('avc_f') as HTMLInputElement).checked,
        epilepsy: (document.getElementById('epilepsia_f') as HTMLInputElement).checked
    };

    previousHistory.generalConditions = generalConditions;
    previousHistory.patientAllergies = patientAllergies;
    previousHistory.clinicalHistory = clinicalHistory;
    previousHistory.familyHistory = familyHistory;

    return previousHistory;
}
