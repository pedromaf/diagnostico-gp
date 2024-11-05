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
const errorSpan = document.getElementById("errorSpan");
var errors = [];
const urlParams = new URLSearchParams(window.location.search);
const medicalRecordId = urlParams.get('medicalRecordId');
const confirmButton = document.getElementById('confirmButton');
confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.addEventListener('click', confirmLaboratoryAnalyses);
const formFields = [
    { fieldName: 'albumin', field: document.getElementById('albumin'), required: true },
    { fieldName: 'alkalinePhosphatase', field: document.getElementById('alkalinePhosphatase'), required: true },
    { fieldName: 'alanineTransaminase', field: document.getElementById('alanineTransaminase'), required: true },
    { fieldName: 'aspartateTransaminase', field: document.getElementById('aspartateTransaminase'), required: true },
    { fieldName: 'bilirubin', field: document.getElementById('bilirubin'), required: true },
    { fieldName: 'cholinesterase', field: document.getElementById('cholinesterase'), required: true },
    { fieldName: 'cholesterol', field: document.getElementById('cholesterol'), required: true },
    { fieldName: 'creatinine', field: document.getElementById('creatinine'), required: true },
    { fieldName: 'gammaGlutamylTransferase', field: document.getElementById('gammaGlutamylTransferase'), required: true },
    { fieldName: 'totalProtein', field: document.getElementById('totalProtein'), required: true },
];
if (!medicalRecordId) {
    alert(AppConstants.NO_MEDICAL_RECORD_ID_PROVIDED);
    window.location.href = AppConstants.BASE_URL + AppConstants.PRONTUARIO_PATH;
}
formFields.forEach((formField) => {
    const inputElement = formField.field;
    inputElement.dataset.rawValue = '';
    inputElement.addEventListener('input', (event) => {
        let value = inputElement.value;
        let digits = value.replace(/\D/g, '');
        inputElement.value = digits;
        inputElement.dataset.rawValue = digits;
        if (digits.length > 0) {
            let numberValue = parseInt(digits, 10);
            let decimalValue = numberValue / 100;
            inputElement.value = decimalValue.toFixed(2);
        }
    });
});
function clearErrors() {
    errorSpan.innerHTML = "";
    errors = new Array();
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
    errorSpan.innerHTML = "";
    if (errorSpan != null) {
        errors.forEach(error => {
            var newErrorP = document.createElement('p');
            newErrorP.innerHTML = error;
            errorSpan.appendChild(newErrorP);
        });
    }
}
function validateFields() {
    let isValid = true;
    formFields.forEach((formField) => {
        const inputElement = formField.field;
        const value = inputElement.value.trim();
        if (formField.required && value == "") {
            displayError(AppConstants.ERROR_INVALID_FORM);
            isValid = false;
        }
    });
    return isValid;
}
function confirmLaboratoryAnalyses() {
    return __awaiter(this, void 0, void 0, function* () {
        clearErrors();
        if (validateFields()) {
            var laboratoryAnalyses = buildLaboratoryAnalysesObject();
            try {
                const response = yield apiService.put(AppConstants.LABOATORY_ANALYSES_ENDPOINT.replace("{medicalRecordId}", medicalRecordId), laboratoryAnalyses);
                console.log(response.data);
                if (response.error) {
                    alert(response.error);
                }
                else {
                    window.location.href = `${AppConstants.BASE_URL}${AppConstants.SINTOMATOLOGIA_PATH}?medicalRecordId=${medicalRecordId}`;
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
    });
}
function buildLaboratoryAnalysesObject() {
    var laboratoryAnalyses = {};
    formFields.forEach((formField) => {
        const inputElement = formField.field;
        const value = inputElement.value.trim();
        if (value !== '') {
            laboratoryAnalyses[formField.fieldName] = parseFloat(value);
        }
    });
    return laboratoryAnalyses;
}
