import { AppConstants } from '../util/constants.js';
import { apiService } from './api-service.js';
import { MedicalRecord } from '../interfaces/medical-record.js';
import { formatter } from '../util/formatter.js';

const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');

let patientData: MedicalRecord = {} as MedicalRecord;

if (!medicalRecordId) {
    alert(AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED);
    window.location.href = AppConstants.BASE_URL + AppConstants.PRONTUARIO_PATH;
}

document.addEventListener('DOMContentLoaded', () => {
    getPatientData();
});

async function getPatientData() {
    try {
        const endpoint = AppConstants.PATIENT_DATA_ENDPOINT.replace("{medicalRecordId}", medicalRecordId);
        const response = await apiService.get<MedicalRecord>(endpoint);

        if (response.error) {
            alert(response.error);
        } else {
            patientData = response.data;

            console.log(patientData);
            
            setupPatientData();
            generateDiagnosis();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function setupPatientData() {
    var patientNameText = document.getElementById("patientName");
    var patientAddressText = document.getElementById("patientAddress");
    var patientBirthdateText = document.getElementById("patientBirthdate");

    patientNameText.innerHTML += patientData.name;
    patientAddressText.innerHTML += patientData.address;
    patientBirthdateText.innerHTML += formatter.formatDate(new Date(patientData.birthdate));
}

async function generateDiagnosis() {
    try {
        const endpoint = AppConstants.GET_DIAGNOSIS_PATH.replace("{medicalRecordId}", medicalRecordId);
        const response = await apiService.get<any>(endpoint);

        if (response.error) {
            alert(response.error);
        } else {
            setDiagnosisResult(response.data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function setDiagnosisResult(data: any) {
    console.log(data);
}