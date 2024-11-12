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
                console.log(patientData);
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
    console.log(data);
}
