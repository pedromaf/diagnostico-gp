class Formatter {
    isValidDate(dateString: string): boolean {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(dateString)) {
            return false;
        }
        const [_, dayStr, monthStr, yearStr] = dateString.match(regex) || [];
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10) - 1;
        const year = parseInt(yearStr, 10);
    
        const date = new Date(year, month, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day
        );
    }

    formatPhoneNumberInput(event: Event) {
        const input = event.target as HTMLInputElement;
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
    
    formatDateInput(event: Event) {
        const input = event.target as HTMLInputElement;
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
    
}

export const formatter = new Formatter();