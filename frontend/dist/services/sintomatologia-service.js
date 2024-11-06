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
const errorSpan = document.getElementById("errorSpan");
let errors = [];
let patientData = {};
const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');
const generateDiagnosisButton = document.getElementById('submitButton');
generateDiagnosisButton === null || generateDiagnosisButton === void 0 ? void 0 : generateDiagnosisButton.addEventListener('click', generateDiagnosis);
const symptomMapping = {
    fever: "Fever",
    cough: "Cough",
    fatigue: "Fatigue",
    shortnessOfBreath: "Shortness of Breath",
    chestPain: "Chest Pain",
    headache: "Headache",
    palpitations: "Palpitations",
    nausea: "Nausea",
    vomiting: "Vomiting",
    dizziness: "Dizziness",
    chills: "Chills",
    lossOfSmell: "Loss of Smell",
    lossOfTaste: "Loss of Taste",
    diarrhea: "Diarrhea",
    extremeFatigue: "Extreme Fatigue",
    fainting: "Fainting",
};
const symptomRows = document.querySelectorAll('#symptomsTableBody tr');
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
function clearErrors() {
    if (errorSpan) {
        errorSpan.innerHTML = "";
    }
    errors = [];
}
function displayError(error) {
    var isNew = true;
    errors.forEach(err => {
        if (err == error) {
            isNew = false;
        }
    });
    if (isNew) {
        errors.push(error);
    }
    if (errorSpan) {
        errorSpan.innerHTML = "";
        errors.forEach(err => {
            const newErrorP = document.createElement('p');
            newErrorP.textContent = err;
            errorSpan.appendChild(newErrorP);
        });
    }
}
function validateFields(symptomatology) {
    let isValid = true;
    const selectedSymptoms = symptomatology.symptoms;
    if (selectedSymptoms.length === 0) {
        displayError(AppConstants.ERROR_NO_SYMPTOM_SELECTED);
        isValid = false;
    }
    else {
        selectedSymptoms.forEach(symptom => {
            if (symptom.duration === undefined || symptom.severity === undefined || symptom.severity === "") {
                displayError(AppConstants.ERROR_INCOMPLETE_SYMPTOM_FIELDS);
                isValid = false;
            }
        });
    }
    return isValid;
}
function getSymptomFields() {
    const symptoms = [];
    symptomRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const durationSelect = row.querySelectorAll('select')[0];
        const severitySelect = row.querySelectorAll('select')[1];
        if (checkbox.checked) {
            const mapping = symptomMapping[checkbox.id];
            if (mapping) {
                const symptom = {
                    name: mapping,
                    duration: durationSelect.value ? parseInt(durationSelect.value, 10) : undefined,
                    severity: severitySelect.value || undefined,
                };
                symptoms.push(symptom);
            }
        }
    });
    return symptoms;
}
function generateDiagnosis(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        clearErrors();
        const symptomatology = {
            symptoms: getSymptomFields(),
        };
        if (validateFields(symptomatology)) {
            try {
                const endpoint = AppConstants.SYMPTOMATOLOGY_ENDPOINT.replace("{medicalRecordId}", medicalRecordId);
                const response = yield apiService.put(endpoint, symptomatology);
                console.log(response.data);
                if (response.error) {
                    alert(response.error);
                }
                else {
                    //window.location.href = `${AppConstants.BASE_URL}${AppConstants.DIAGNOSTICO_PATH}?medicalRecordId=${medicalRecordId}`;
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
    });
}
