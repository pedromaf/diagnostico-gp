var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppConstants } from '../util/constants.js';
import { apiService } from './api-service.js';
const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');
if (!medicalRecordId) {
    alert(AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED);
    window.location.href = AppConstants.BASE_URL + AppConstants.PRONTUARIO_PATH;
}
const confirmButton = document.getElementById('confirmButton');
confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.addEventListener('click', confirmPreviousHistoryCreation);
function confirmPreviousHistoryCreation() {
    return __awaiter(this, void 0, void 0, function* () {
        var previousHistory = buildPreviousHistoryObject();
        try {
            const response = yield apiService.put(AppConstants.PREVIOUS_HISTORY_ENDPOINT.replace("{medicalRecordId}", medicalRecordId.toString()), previousHistory);
            if (response.error) {
                alert(response.error);
            }
            else {
                window.location.href = AppConstants.BASE_URL + AppConstants.LABORATORIO_PATH + "?medicalRecordId=" + medicalRecordId;
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
function buildPreviousHistoryObject() {
    var previousHistory = {};
    var generalConditions = {
        smoker: document.getElementById('fumante').checked,
        alcohol: document.getElementById('alcool').checked
    };
    var patientAllergies = {
        milk: document.getElementById('leite').checked,
        egg: document.getElementById('ovo').checked,
        seafood: document.getElementById('fmar').checked,
        peanutsNuts: document.getElementById('AN').checked,
        aspirin: document.getElementById('AAS').checked,
        penicillin: document.getElementById('Pni').checked,
        nsaids: document.getElementById('AINEs').checked,
        mites: document.getElementById('acaros').checked,
        dust: document.getElementById('poeira').checked,
        pollen: document.getElementById('polen').checked,
        bees: document.getElementById('abelha').checked,
        catsDogs: document.getElementById('CG').checked
    };
    var clinicalHistory = {
        diabetes: document.getElementById('diabetes').checked,
        hypertension: document.getElementById('hipertensao').checked,
        asthma: document.getElementById('asma').checked,
        hypothyroidism: document.getElementById('hipotireoidismo').checked,
        arthritis: document.getElementById('artrite').checked,
        cancer: document.getElementById('cancer').checked,
        depression: document.getElementById('depressao').checked,
        kidneyDisease: document.getElementById('doenca_renal').checked,
        hepatitis: document.getElementById('hepatite').checked,
        tuberculosis: document.getElementById('tuberculose').checked,
        anemia: document.getElementById('anemia').checked,
        heartFailure: document.getElementById('insuficiencia_cardiaca').checked,
        lungDisease: document.getElementById('doenca_pulmonar').checked,
        alzheimer: document.getElementById('alzheimer').checked,
        stroke: document.getElementById('avc').checked,
        epilepsy: document.getElementById('epilepsia').checked
    };
    var familyHistory = {
        diabetes: document.getElementById('diabetes_f').checked,
        hypertension: document.getElementById('hipertensao_f').checked,
        asthma: document.getElementById('asma_f').checked,
        hypothyroidism: document.getElementById('hipotireoidismo_f').checked,
        arthritis: document.getElementById('artrite_f').checked,
        cancer: document.getElementById('cancer_f').checked,
        depression: document.getElementById('depressao_f').checked,
        kidneyDisease: document.getElementById('doenca_renal_f').checked,
        hepatitis: document.getElementById('hepatite_f').checked,
        tuberculosis: document.getElementById('tuberculose_f').checked,
        anemia: document.getElementById('anemia_f').checked,
        heartFailure: document.getElementById('insuficiencia_cardiaca_f').checked,
        lungDisease: document.getElementById('doenca_pulmonar_f').checked,
        alzheimer: document.getElementById('alzheimer_f').checked,
        stroke: document.getElementById('avc_f').checked,
        epilepsy: document.getElementById('epilepsia_f').checked
    };
    previousHistory.generalConditions = generalConditions;
    previousHistory.patientAllergies = patientAllergies;
    previousHistory.clinicalHistory = clinicalHistory;
    previousHistory.familyHistory = familyHistory;
    return previousHistory;
}
