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
import { formatter } from '../util/formatter.js';
const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');
let patientData = {};
const diseaseDescriptions = {
    healthy: { title: "Saudável", text: "O paciente está saudável e não apresenta sinais de doenças hepáticas." },
    hepatitisC: { title: "Hepatite C", text: "A hepatite C é uma doença viral causada pelo vírus HCV, que afeta principalmente o fígado. Pode ser crônica e levar a complicações graves." },
    hepaticFibrosis: { title: "Fibrose Hepática", text: "A fibrose hepática é o processo de cicatrização do fígado devido a lesões repetidas. Pode evoluir para cirrose se não tratada." },
    hepaticCirrhosis: { title: "Cirrose Hepática", text: "A cirrose hepática é uma condição crônica e irreversível do fígado, resultante de lesões contínuas. Afeta gravemente o funcionamento do fígado." }
};
if (!medicalRecordId) {
    alert(AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED);
    window.location.href = AppConstants.BASE_URL + AppConstants.PRONTUARIO_PATH;
}
document.addEventListener('DOMContentLoaded', () => {
    getPatientData();
});
function getPatientData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const endpoint = AppConstants.PATIENT_DATA_ENDPOINT.replace("{medicalRecordId}", medicalRecordId);
            const response = yield apiService.get(endpoint);
            if (response.error) {
                alert(response.error);
            }
            else {
                patientData = response.data;
                setupPatientData();
                generateDiagnosis();
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
function setupPatientData() {
    var patientNameText = document.getElementById("patientName");
    var patientAddressText = document.getElementById("patientAddress");
    var patientBirthdateText = document.getElementById("patientBirthdate");
    patientNameText.innerHTML += patientData.name;
    patientAddressText.innerHTML += patientData.address;
    patientBirthdateText.innerHTML += formatter.formatDate(new Date(patientData.birthdate));
}
function generateDiagnosis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const endpoint = AppConstants.GET_DIAGNOSIS_PATH.replace("{medicalRecordId}", medicalRecordId);
            const response = yield apiService.get(endpoint);
            if (response.error) {
                alert(response.error);
            }
            else {
                setDiagnosisResult(response.data);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
function setDiagnosisResult(data) {
    document.getElementById('healthy').checked = data.healthy;
    document.getElementById('hepatitisC').checked = data.hepatitisC;
    document.getElementById('hepaticFibrosis').checked = data.hepaticFibrosis;
    document.getElementById('hepaticCirrhosis').checked = data.hepaticCirrhosis;
    const resultTitle = document.getElementById("result-text-title");
    const resultText = document.getElementById("result-text");
    if (data.hepatitisC) {
        resultTitle.innerText = diseaseDescriptions.hepatitisC.title;
        resultText.innerText = diseaseDescriptions.hepatitisC.text;
    }
    else if (data.hepaticFibrosis) {
        resultTitle.innerText = diseaseDescriptions.hepaticFibrosis.title;
        resultText.innerText = diseaseDescriptions.hepaticFibrosis.text;
    }
    else if (data.hepaticCirrhosis) {
        resultTitle.innerText = diseaseDescriptions.hepaticCirrhosis.title;
        resultText.innerText = diseaseDescriptions.hepaticCirrhosis.text;
    }
    else if (data.healthy) {
        resultTitle.innerText = diseaseDescriptions.healthy.title;
        resultText.innerText = diseaseDescriptions.healthy.text;
    }
    else {
        resultTitle.innerText = "";
        resultText.innerText = "";
    }
}
