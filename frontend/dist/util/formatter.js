class Formatter {
    isValidDate(dateString) {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) {
            return false;
        }
        const [_, dayStr, monthStr, yearStr] = dateString.match(regex) || [];
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10) - 1;
        const year = parseInt(yearStr, 10);
        const date = new Date(year, month, day);
        return (date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day);
    }
    formatPhoneNumberInput(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue += '(' + value.substring(0, 2);
        }
        if (value.length >= 3) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length >= 8) {
            formattedValue += '-' + value.substring(7, 11);
        }
        input.value = formattedValue;
    }
    formatDateInput(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, "");
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        let formattedValue = "";
        if (value.length > 0) {
            formattedValue = value.substring(0, 2);
        }
        if (value.length >= 3) {
            formattedValue += "/" + value.substring(2, 4);
        }
        if (value.length >= 5) {
            formattedValue += "/" + value.substring(4, 8);
        }
        input.value = formattedValue;
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    restrictNumericInput(event) {
        const key = event.key;
        if (!/\d/.test(key)) {
            event.preventDefault();
        }
    }
    formatDate(date) {
        if (date instanceof Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return undefined;
    }
}
export const formatter = new Formatter();
