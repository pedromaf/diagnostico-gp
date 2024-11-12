import { AppConstants } from '../util/constants.js';
import { apiService } from './api-service.js';
import { Symptomatology } from '../interfaces/symptomatology.js';
import { Symptom } from '../interfaces/symptom.js';
import { MedicalRecord } from '../interfaces/medical-record.js';
import { formatter } from '../util/formatter.js';

const errorSpan = document.getElementById("errorSpan");
let errors: string[] = [];

let patientData: MedicalRecord = {} as MedicalRecord;

const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');

const generateDiagnosisButton = document.getElementById('submitButton') as HTMLAnchorElement;
generateDiagnosisButton?.addEventListener('click', generateDiagnosis);

const symptomMapping: { [key: string]: string } = {
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

async function getPatientData() {
    try {
        const endpoint = AppConstants.PATIENT_DATA_ENDPOINT.replace("{medicalRecordId}", medicalRecordId);
        const response = await apiService.get<MedicalRecord>(endpoint);

        if (response.error) {
            alert(response.error);
        } else {
            patientData = response.data;

            setupPatientData();
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

function clearErrors() {
    if (errorSpan) {
        errorSpan.innerHTML = "";
    }
    errors = [];
}

function displayError(error: string) {
    var isNew = true;
    errors.forEach(err => {
        if (err ==  error) {
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

function validateFields(symptomatology: Symptomatology): boolean {
    let isValid = true;
    const selectedSymptoms = symptomatology.symptoms;

    if (selectedSymptoms.length === 0) {
        displayError(AppConstants.ERROR_NO_SYMPTOM_SELECTED);
        isValid = false;
    } else {
        selectedSymptoms.forEach(symptom => {
            if (symptom.duration === undefined || symptom.severity === undefined || symptom.severity === "") {
                displayError(AppConstants.ERROR_INCOMPLETE_SYMPTOM_FIELDS);
                isValid = false;
            }
        });
    }

    return isValid;
}

function getSymptomFields(): Symptom[] {
    const symptoms: Symptom[] = [];

    symptomRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const durationSelect = row.querySelectorAll('select')[0] as HTMLSelectElement;
        const severitySelect = row.querySelectorAll('select')[1] as HTMLSelectElement;

        if (checkbox.checked) {
            const mapping = symptomMapping[checkbox.id];
            
            if (mapping) {
                const symptom: Symptom = {
                    name: mapping,
                    duration: durationSelect.value || undefined,
                    severity: severitySelect.value || undefined,
                };

                symptoms.push(symptom);
            }
        }
    });

    return symptoms;
}

async function generateDiagnosis(event: Event) {
    event.preventDefault();
    clearErrors();

    const symptomatology: Symptomatology = {
        symptoms: getSymptomFields(),
    };

    if (validateFields(symptomatology)) {
        try {
            const endpoint = AppConstants.SYMPTOMATOLOGY_ENDPOINT.replace("{medicalRecordId}", medicalRecordId);
            const response = await apiService.put<MedicalRecord>(endpoint, symptomatology);

        

            if (response.error) {
                alert(response.error);
            } else {
                window.location.href = `${AppConstants.BASE_URL}${AppConstants.DIAGNOSTICO_PATH}?medicalRecordId=${medicalRecordId}`;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
