function validateCreditCard(number) {
    // Remove non-digit characters
    number = number.replace(/\D/g, "");
    
    // Define regex patterns for different card types
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // Visa: Starts with 4, 13 or 16 digits
        mastercard: /^5[1-5][0-9]{14}$/, // Mastercard: Starts with 51-55, 16 digits
    }
    
    // Determine card type
    for (let [type, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(number)) {
            return `Valid ${type.toUpperCase()} card number.`;
        }
    }
    
    return "Invalid card number.";
}

// Example usage
console.log(validateCreditCard("4111111111111111")); // Visa
console.log(validateCreditCard("5105105105105100")); // Mastercard

