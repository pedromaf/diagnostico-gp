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
var errors = new Array();
const formFields = [
    { fieldName: 'name', field: document.getElementById('name'), required: true },
    { fieldName: 'birthdate', field: document.getElementById('birthdate'), required: true },
    { fieldName: 'gender', field: document.getElementById('gender'), required: false },
    { fieldName: 'address', field: document.getElementById('address'), required: true },
    { fieldName: 'phoneNumber', field: document.getElementById('phoneNumber'), required: true },
    { fieldName: 'email', field: document.getElementById('email'), required: false },
    { fieldName: 'consultationDate', field: document.getElementById('consultationDate'), required: true }
];
const confirmButton = document.getElementById('confirmButton');
confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.addEventListener('click', confirmMedicalRecordCreation);
const birthdateInput = document.getElementById("birthdate");
birthdateInput.addEventListener("input", formatter.formatDateInput);
birthdateInput.addEventListener("keypress", formatter.restrictNumericInput);
const consultationDateInput = document.getElementById("consultationDate");
consultationDateInput.addEventListener("input", formatter.formatDateInput);
consultationDateInput.addEventListener("keypress", formatter.restrictNumericInput);
const phoneNumberInput = document.getElementById('phoneNumber');
phoneNumberInput.addEventListener('input', formatter.formatPhoneNumberInput);
phoneNumberInput.addEventListener('keypress', formatter.restrictNumericInput);
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
function getFieldNameTranslation(fieldName) {
    switch (fieldName) {
        case 'birthdate':
            return "data de nascimento";
        case 'consultationDate':
            return 'data da consulta';
    }
}
function validateFields() {
    let isValid = true;
    formFields.forEach((formField) => {
        const inputElement = formField.field;
        var value = inputElement.value.trim();
        if (formField.required && value == "") {
            displayError(AppConstants.ERROR_INVALID_FORM);
            isValid = false;
        }
        if (formField.fieldName == "phoneNumber" && value != "" && value.length != 15) {
            displayError(AppConstants.ERROR_INVALID_PHONE_NUMBER);
            isValid = false;
        }
        if (formField.fieldName === "consultationDate" && value != "") {
            if (!formatter.isValidDate(value)) {
                displayError(AppConstants.ERROR_INVALID_DATE_FORMAT.replace("{fieldName}", getFieldNameTranslation(formField.fieldName)));
                isValid = false;
            }
        }
        if (formField.fieldName === "birthdate" && value != "") {
            if (!formatter.isValidDate(value)) {
                displayError(AppConstants.ERROR_INVALID_DATE_FORMAT.replace("{fieldName}", getFieldNameTranslation(formField.fieldName)));
                isValid = false;
            }
        }
        if (formField.fieldName === "email" && value != "") {
            if (!formatter.validateEmail(value)) {
                displayError(AppConstants.ERROR_INVALID_EMAIL_FORMAT);
                isValid = false;
            }
        }
    });
    return isValid;
}
function confirmMedicalRecordCreation() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        clearErrors();
        if (validateFields()) {
            var medicalRecord = buildMedicalRecordObject();
            try {
                const response = yield apiService.post(AppConstants.MEDICAL_RECORDS_ENDPOINT, medicalRecord);
                if (response.error) {
                    alert(response.error);
                }
                else if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.id) {
                    window.location.href = AppConstants.BASE_URL + AppConstants.HISTORICO_PATH + "?medicalRecordId=" + response.data.id;
                }
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
    });
}
function buildMedicalRecordObject() {
    var medicalRecord = {};
    formFields.forEach((formField) => {
        const inputElement = formField.field;
        let value = inputElement.value.trim();
        if (formField.fieldName === 'phoneNumber') {
            medicalRecord[formField.fieldName] = value.replace(/\D/g, '');
        }
        else if (formField.fieldName === "birthdate" || formField.fieldName === "consultationDate") {
            const [day, month, year] = value.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            medicalRecord[formField.fieldName] = date;
        }
        else {
            medicalRecord[formField.fieldName] = value;
        }
    });
    return medicalRecord;
}
