'use strict';

/*Imports*/
// import these variable from landcode.js
import { mobile_selector, telephone_selector, mobile_code_value, telephone_code_value } from './landcode_input.js';

/*Functions*/
function validateName(Name) { // validate the a name
    const regex = /^[A-Za-z'-]{1,}$/; // a regular expression that matches only letters, apostrophes, or hyphens, with a minimum length of 2
    const isValidName = regex.test(Name.trim()); // test if the trimmed first name matches the regex

    return isValidName; // return true if all fields are valid, false otherwise
}

function addStyling(errorElements) { //Add styling to a variable
    if (errorElements.length) { // check if it's a NodeList with elements
        for (let i = 0; i < errorElements.length; i++) { // loop through the elements and give them these styling.
            errorElements[i].style.color = 'red'; // give text color red.
            errorElements[i].style.padding = 0; // give padding 0.
            errorElements[i].style.margin = 0; // give margin 0.
        }
    } else { // if it's a single element
        errorElements.style.color = 'red'; // give text color red.
        errorElements.style.padding = 0; // give padding 0.
        errorElements.style.margin = 0; // give margin 0.
    }
}

function updatePhoneModalValue(selector, inputField, codeValue, modalField) { //Update phone/mobile value in modal function
    // Function to format the phone number
    function formatPhoneNumber() {
        const inputValue = inputField.value; // take the input field as inputvalue
        const numberArray = inputValue ? inputValue.match(/.{1,3}/g) : null; // if inputvalue is true return an array with a sequence of 3 characters.
        const formattedValue = numberArray ? numberArray.join(' ') : inputValue; // if numberarray is true return the array as a joined string but with spaces between every 3rd character
        modalField.innerHTML = `${codeValue.value} ${formattedValue}`; // update the modalfield with the code and formatted value
    }

    // Initial formatting
    formatPhoneNumber();

    // Event listeners for input fields
    selector.addEventListener('input', formatPhoneNumber); // format on selecting a number
    inputField.addEventListener('input', formatPhoneNumber); // format on input of number
}

function updateFormValidation(errorMessage, ErrorElement, truevaluesindex, truevalues) { // gives message and return true or false
    if (errorMessage) { // if there is an error message(meaning its true).
        for (let i = 0; i < ErrorElement.length; i++) { // give all errormessage elements the error message.
            ErrorElement[i].innerHTML = errorMessage;
        }
        truevalues[truevaluesindex] = false; // truevalues first index gets a false value.
    } else {
        for (let i = 0; i < ErrorElement.length; i++) { // else give the errormessage elements empty values.
            ErrorElement[i].innerHTML = '';
        }
        truevalues[truevaluesindex] = true; // truevalues index true.
    }

    return truevalues;
}

function validateNumber(str) { // return true or false. checks if a string has only numbers in it. if it has something else return true.
    const letterRegex = /[a-zA-Z]/;
    const onlyDigitsRegex = /^[0-9]+$/;
    const containsLetters = letterRegex.test(str);
    const beginsOrEndsWithLetters = letterRegex.test(str.charAt(0)) || letterRegex.test(str.charAt(str.length - 1));
    const hasLettersInTheMiddle = str.substring(1, str.length - 1).split("").some(char => letterRegex.test(char));
    const isOnlyDigits = onlyDigitsRegex.test(str);

    if (isOnlyDigits) {
        return false; // if string is only digits, return false
    } else {
        return containsLetters || beginsOrEndsWithLetters || hasLettersInTheMiddle;
    }
}

/*Variables*/

/* Buttons*/
const SubmitForm = document.getElementById('saveChangesButton');
const OfficialySubmitForm = document.getElementById('OfficialySubmitForm');

/* Form Values*/
let Firstname = document.getElementById('Firstname');
let Infix = document.getElementById('Infix');
let Lastname = document.getElementById('Lastname');
let Email = document.getElementById('Email');
let Clientname = document.getElementById('ClientId');
let Functionname = document.getElementById('FunctionId');
let Telephone_number = document.getElementById('Telephone_number');
let Mobile_number = document.getElementById('Mobile_number');

/* Form Error Values */
let FirstNameError = document.querySelectorAll('.FirstNameError');
let InfixError = document.querySelectorAll('.InfixError');
let LastNameError = document.querySelectorAll('.LastNameError');
let EmailError = document.querySelectorAll('.EmailError');
let ClientNameError = document.querySelectorAll('.ClientNameError');
let FunctionsError = document.querySelectorAll('.FunctionsError');
let TelephoneCodeError = document.querySelectorAll('.TelephoneCodeError');
let TelephoneNumberError = document.querySelectorAll('.TelephoneNumberError');
let MobileCodeError = document.querySelectorAll('.MobileCodeError');
let MobileNumberError = document.querySelectorAll('.MobileNumberError');

/* Modal Values*/
let Firstnamemodal = document.getElementById('Firstnamemodal');
let Infixmodal = document.getElementById('Infixmodal');
let Lastnamemodal = document.getElementById('Lastnamemodal');
let Emailmodal = document.getElementById('Emailmodal');
let Clientnamemodal = document.getElementById('Clientnamemodal');
let Functionsmodal = document.getElementById('Functionsmodal');
let Telephonemodal = document.getElementById('Telephonemodal');
let Mobilemodal = document.getElementById('Mobilemodal');

const NumberPattern = /^[0-9]{9,15}$/; // pattern for a 10-digit phone number with spaces

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i; // emailpattern

let formvalidated = false; // if everything whent well this should be true at the end of the code

/* Error Message Variables*/
let errorMessagefirstname = ''; // create empty errormessage variable
let errorMessageinfix = ''; // create empty errormessage variable
let errorMessagelastname = ''; // create empty errormessage variable
let errorMessageclientname = ''; // create empty errormessage variable
let errorMessagefunctions = ''; // create empty errormessage variable
let errorMessageEmailvalue = ''; // create empty errormessage variable
let errorMessagemobilecodevalue = ''; // create empty errormessage variable
let errorMessageMobileNumbervalue = ''; // create empty errormessage variable
let errorMessagetelephonecodevalue = ''; // create empty errormessage variable
let errorMessageTelephoneNumbervalue = ''; // create empty errormessage variable

// create an empty array, that matches the amount of inputs in the form.
let trueValues = [false, false, false, false, false, false, false, false, false, false];

/*Functionality*/
/*Add styling to Error variables*/
addStyling(FirstNameError);
addStyling(InfixError);
addStyling(LastNameError);
addStyling(EmailError);
addStyling(ClientNameError);
addStyling(FunctionsError);
addStyling(TelephoneCodeError);
addStyling(TelephoneNumberError);
addStyling(MobileCodeError);
addStyling(MobileNumberError);

/*--------------------------------------------UPDATE BY INPUT, CHANGE, LOAD, CLICK--------------------------------------------*/
function updateModalContent() {
    // update the value in the modal where the firstname value is.
    Firstnamemodal.innerHTML = Firstname.value;
    // update the value in the modal where the infix value is.
    Infixmodal.innerHTML = Infix.value;
    // update the value in the modal where the lastname value is.
    Lastnamemodal.innerHTML = Lastname.value;
    // update the value in the modal where the email value is.
    Emailmodal.innerHTML = Email.value;
    // update the value in the modal where the clientname value is.
    Clientname.length !== 0 ? Clientnamemodal.innerHTML = Clientname.options[Clientname.selectedIndex].textContent : '';
    // update the value in the modal where the function name is
    Functionname.length !== 0 ? Functionsmodal.innerHTML = Functionname.options[Functionname.selectedIndex].textContent : '';
    //telephone
    // update the value in the modal where the telephone value is when a landcode is selected.
    updatePhoneModalValue(telephone_selector, Telephone_number, telephone_code_value, Telephonemodal);
    //mobile
    // update the value in the modal where the mobile value is when a landcode is selected.
    updatePhoneModalValue(mobile_selector, Mobile_number, mobile_code_value, Mobilemodal);

}

// Add event listeners to the same function for multiple event types to update the modal
['input', 'change', 'load'].forEach(function (eventType) {
    window.addEventListener(eventType, updateModalContent);
});

/*--------------------------------------------DATA VALIDATION--------------------------------------------*/
SubmitForm.addEventListener('click', function () {
    updateModalContent();

    // form values 
    let FirstNameValue = Firstname.value;
    let InfixValue = Infix.value;
    let LastNameValue = Lastname.value;
    let EmailValue = Email.value;
    let ClientNameValue = Clientname.value;
    let FunctionNameValue = Functionname.value;
    let mobilecodevalue = mobile_code_value.value;
    let mobilenumbervalue = Mobile_number.value;
    let telephonecodevalue = telephone_code_value.value;
    let telephonenumbervalue = Telephone_number.value;

    /*Firstname*/
    if (FirstNameValue.length === 0 ) {
        errorMessagefirstname = 'Field Empty'; // if FirstNameValue is empty give this message.
        trueValues = updateFormValidation(errorMessagefirstname, FirstNameError, 0, trueValues);
        console.log(trueValues[3] + ': this index is 0 , EM: Empty Field');
    } else if (!validateName(FirstNameValue)) {
        errorMessagefirstname = 'Not Valid'; // if FirstNameValue is empty give this message.
        trueValues = updateFormValidation(errorMessagefirstname, FirstNameError, 0, trueValues);
        console.log(trueValues[3] + ': this index is 0 , EM: Not Valid');
    } else {
        errorMessagefirstname = ''; // if FirstNameValue is empty give this message.
        trueValues = updateFormValidation(errorMessagefirstname, FirstNameError, 0, trueValues);
        console.log(`${trueValues[3]}: this index is 0 , M: gucci`);
    }

    /*Infix*/
    if (InfixValue.length !== 0 && !validateName(InfixValue)) {
        errorMessageinfix = 'Not Valid'; // if InfixValue is not empty but not valid, give this message.
        trueValues = updateFormValidation(errorMessageinfix, InfixError, 1, trueValues);
        console.log(trueValues[1] + ': this index is 1 , EM: has to be a real value');
    } else {
        errorMessageinfix = ''; // if InfixValue is valid or empty, no error message.
        trueValues = updateFormValidation(errorMessageinfix, InfixError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1 , M: gucci`);
    }

    /*Lastname*/
    if (LastNameValue.length === 0) {
        errorMessagelastname = 'Field Empty'; // if LastNameValue is empty give this message.
        trueValues = updateFormValidation(errorMessagelastname, LastNameError, 2, trueValues);
        console.log(trueValues[2] + ': this index is 2 , EM: Empty Field');
    } else if (!validateName(LastNameValue)) {
        errorMessagelastname = 'Not Valid'; // if LastNameValue is not valid give this message.
        trueValues = updateFormValidation(errorMessagelastname, LastNameError, 2, trueValues);
        console.log(trueValues[2] + ': this index is 2 , EM: Not Valid');
    } else {
        errorMessagelastname = ''; // if LastNameValue is valid, clear the error message.
        trueValues = updateFormValidation(errorMessagelastname, LastNameError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2 , M: gucci`);
    }

    /*Clientname*/
    if (ClientNameValue.length === 0) {
        errorMessageclientname = 'You have not selected a code'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageclientname, ClientNameError, 3, trueValues);
        console.log(trueValues[3] + ': this index is 3 , EM: empty field');
    } else {
        errorMessageclientname = ''; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageclientname, ClientNameError, 3, trueValues);
        console.log(`${trueValues[3]}: this index is 3 , M: gucci`);
    } 

    /*Email*/
    console.log(emailPattern.test(EmailValue));
    console.log(!emailPattern.test(EmailValue));
    if (EmailValue.length === 0) {
        errorMessageEmailvalue = 'Field is empty'; // if EmailValue is empty give this message.
        trueValues = updateFormValidation(errorMessageEmailvalue, EmailError, 4, trueValues);
        console.log(trueValues[4] + ': this index is 4 , EM: field empty');
    } else if (!emailPattern.test(EmailValue)) { EmailValue // checks if the emailvalue matches the emailpattern
        errorMessageEmailvalue = 'email is invalid'; // if EmailValue true give this message.
        trueValues = updateFormValidation(errorMessageEmailvalue, EmailError, 4, trueValues);
        console.log(`${trueValues[4]}: this index is 4 , EM: regex pattern doesnt match`);
    } else {
        errorMessageEmailvalue = ''; // else return no error
        trueValues = updateFormValidation(errorMessageEmailvalue, EmailError, 4, trueValues);
        console.log(`${trueValues[4]}: this index is 4 , M: gucci`);
    }

    /*Mobile code*/
    if (mobilecodevalue.length === 0) {
        errorMessagemobilecodevalue = 'You have not selected a code'; // if mobilecode is empty give this message.
        trueValues = updateFormValidation(errorMessagemobilecodevalue, MobileCodeError, 5, trueValues);
        console.log(trueValues[5] + ': this index is 5 , EM: empty field');
    }
    else {
        errorMessagemobilecodevalue = ''; // else return no error.
        trueValues = updateFormValidation(errorMessagemobilecodevalue, MobileCodeError, 5, trueValues);
        console.log(`${trueValues[5]}: this index is 5 , M: gucci`);
    }

    /*Mobile number*/
    if (mobilenumbervalue.length === 0) { // nothing was inserted
        errorMessageMobileNumbervalue = 'Field is empty'; // if mobilenumbervalue is empty give this message.
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(trueValues[6] + ': this index is 6 , EM: empty field');
    } else if (validateNumber(mobilenumbervalue)) { // checks if mobilenumbervalue there is a letter in it.
        errorMessageMobileNumbervalue = 'field cannot contain letters';
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(trueValues[6] + ': this index is 6 , EM: contain letters');
    } else if (mobilenumbervalue.length < 9) { // checks if mobilenumbervalue is less than 9 characters
        errorMessageMobileNumbervalue = 'Number has to be atleast 9 digits';
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(trueValues[6] + ': this index is 6 , EM: Less than 9');
    } else if (mobilenumbervalue.length >= 16) { // if the length of mobilenumbervalue is 16 or longer give error.
        errorMessageMobileNumbervalue = 'Number is too long';
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(trueValues[6] + ': this index is 6 , EM: too long');
    } else if (!(NumberPattern.test(mobilenumbervalue))) { // there is something else than mobilenumbervalue.
        errorMessageMobileNumbervalue = 'There can only be numbers';
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(trueValues[6] + ': this index is 6 , EM: else than numbers');
    } else { 
        errorMessageMobileNumbervalue = ''; // else return no error.
        trueValues = updateFormValidation(errorMessageMobileNumbervalue, MobileNumberError, 6, trueValues);
        console.log(`${trueValues[6]}: this index is 6 , M: gucci`);
    }

    /*telephone code*/
    if (telephonecodevalue.length === 0) {
        errorMessagetelephonecodevalue = 'You have not selected a code'; // if telephonecodevalue is empty give this message.
        trueValues = updateFormValidation(errorMessagetelephonecodevalue, TelephoneCodeError, 7, trueValues);
        console.log(trueValues[7] + ': this index is 7 , EM: empty field');
    }
    else {
        errorMessagetelephonecodevalue = ''; // else return no error.
        trueValues = updateFormValidation(errorMessagetelephonecodevalue, TelephoneCodeError, 7, trueValues);
        console.log(`${trueValues[7]}: this index is 7 , M: gucci`);
    }

    /*telephone number*/
    if (telephonenumbervalue.length === 0) { // nothing was inserted
        errorMessageTelephoneNumbervalue = 'Field is empty'; // if telephonenumbervalue is empty give this message.
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(trueValues[8] + ': this index is 8 , EM: empty field');
    } else if (validateNumber(telephonenumbervalue)) { // checks telephonenumbervalue has a letter in it.
        errorMessageTelephoneNumbervalue = 'field cannot contain letters';
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(trueValues[8] + ': this index is 8 , EM: contain letters');
    } else if (telephonenumbervalue.length < 9) { // checks telephonenumbervalue is less than 9 characters.
        errorMessageTelephoneNumbervalue = 'Number has to be atleast 9 digits';
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(trueValues[8] + ': this index is 8 , EM: Less than 9 digit');
    } else if (telephonenumbervalue.length >= 16) { // if the length is 16 or longer give error.
        errorMessageTelephoneNumbervalue = 'Number is too long';
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(trueValues[8] + ': this index is 8 , EM: too long');
    } else if (!(NumberPattern.test(telephonenumbervalue))) { // there is something else than number.
        errorMessageTelephoneNumbervalue = 'There can only be numbers';
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(trueValues[8] + ': this index is 8 , EM: else than numbers');
    }  else { 
        errorMessageTelephoneNumbervalue = ''; // else return no error.
        trueValues = updateFormValidation(errorMessageTelephoneNumbervalue, TelephoneNumberError, 8, trueValues);
        console.log(`${trueValues[8]}: this index is 8 , M: gucci`);
    }

    /*Functionname*/
    if (FunctionNameValue.length === 0) {
        errorMessagefunctions = 'You have not selected a code'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessagefunctions, FunctionsError, 9, trueValues);
        console.log(trueValues[9] + ': this index is 9 , EM: empty field');
    } else {
        errorMessagefunctions = ''; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessagefunctions, FunctionsError, 9, trueValues);
        console.log(`${trueValues[9]}: this index is 9 , M: gucci`);
    } 

    //---------------------------------LAST FORM CHECKS-----------------------------------------
    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 10) { // if the array contains 12 elements execute code
            console.log("All values in the array are true.");
            OfficialySubmitForm.setAttribute('type', 'submit'); // change the type to submit
            formvalidated = true; // formvalidated becomes true
        }
    } else {
        console.log("Not all values in the array are true.");
        formvalidated = false; // formvalidated stays false
    }

    console.log(trueValues);
    console.log(`formvalidated: ${formvalidated}`);
    console.log('-------------------------------');
});

/*--------------------------------------------SUBMIT FORM--------------------------------------------*/
OfficialySubmitForm.addEventListener('click', function () { // when button clicked checks if the formvalidated is true, if well execute a submit.
    //---------------------------------BUTTON CLICK-----------------------------------------
    // if formvalidated is true, make an click event on the submit button.
    if (formvalidated === true) {
        OfficialySubmitForm.click();
    }
    else {
        console.log('there is a problem in the inserted values');
        formvalidated = false; // formvalidated stays false
    }
});