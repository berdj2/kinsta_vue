'use strict';

/*Functions*/

function checkForEmptyValues(arr) { // checks if an given array has empty '' values if not return the value that is not ''
    for (let i = 0; i < arr.length; i++) { // makes a loop to go through the whole array 1 by 1
        if (arr[i] !== '') {
            return `${arr[i]}`; // return the none empty value 
        }
    }
    return ''; // return if all values are empty 
}

function complete(errorMessage, adresscompletedarray, adressindex) {
    if (errorMessage) {
        adresscompletedarray[adressindex] = false;
    }
    else {
        adresscompletedarray[adressindex] = true;
    }
    return adresscompletedarray;
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

function addStyling(errorElements) {// add styling to the error message
    if (errorElements == null) {
        console.log('nothing to see here');
    }
    else {
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
}

function updateAddress() {//update the adress value in the modal.
    let values = []; // array called values
    addressInputs.forEach(input => {
        if (input.value !== undefined) values.push(input.value); // insert every address input value in the values array
        else values.push(''); // if value is undefined, push an empty string instead
    });
    let fulladress = `${values[0]}, ${values[1]} ${values[2]}, ${values[3]} ${values[4]}, ${values[5]}`; // make string
    modaladress.innerHTML = fulladress; // update the string
}


/*variables*/

/*Form*/
let clientname = document.querySelector('#ClientName');
let website = document.querySelector('#ClientWebsite'); // selects the website input field.
let addressInputs = document.querySelectorAll('.address-input'); // selects all the adress input that has the class "address-input" in it.

/*Modal*/
let modalclientname = document.querySelector('#modalClientName');
let modalwebsite = document.querySelector('#modalWebsite'); // selects the modal element for the website.
let modaladress = document.querySelector('#modalAddress'); // selects the modal element for the adress output.

/*Form Error*/
let clientnameError = document.querySelectorAll('.clientnameError');
let ClientWebsiteError = document.querySelectorAll('.ClientWebsiteError');
let ClientadressError = document.querySelectorAll('.ClientAddressError');
let ClientHouseNumberError = document.querySelectorAll('.ClientHouseNumberError');
let ClientCityError = document.querySelectorAll('.ClientCityError');
let ClientStateError = document.querySelectorAll('.ClientStateError');
let ClientLandError = document.querySelectorAll('.ClientCountryError');
let ClientZipError = document.querySelectorAll('.ClientZipError');
let ClientFullAdressError = document.querySelector('.ClientFullAdressError');

/*Error message variables*/
let errorMessageclientname = ''; // create empty errormessage variable
let errorMessageWebsitevalue = ''; // create empty errormessage variable
let errorMessageAdressNumbervalue = ''; // create empty errormessage variable
let errorMessageHouseNumbervalue = ''; // create empty errormessage variable
let errorMessageCityvalue = ''; // create empty errormessage variable
let errorMessageStatevalue = ''; // create empty errormessage variable
let errorMessageLandvalue = ''; // create empty errormessage variable
let errorMessageZipvalue = ''; // create empty errormessage variable
let errorMessageClientFullAdressArray = ['', '', '', '', '', '']; // create an aempty array to hold all the errormessage

/*Buttons*/
const savechanges = document.getElementById('saveChangesButton');
const OfficiallySubmitForm = document.getElementById('OfficiallySubmitForm');

// create a boolean to trigger a button click
let formvalidated = false;

// match strings that contains only these letters.
const Letterregex = /^[a-zA-Z .1-9]|10]*$/; // regex
const NumberPattern = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/; // pattern for a 10-digit phone number with spaces
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i; // emailpattern
const urlPattern = /^(http(s)??:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})$/; // urlpattern

// create an empty array, that matches the amount of inputs in the form.
let trueValues = [false, false, false, false, false, false, false, false];

// an array with 6 false values that corresponds with the adress values
let adressCorrection = [false, false, false, false, false, false];

/*Add Styling*/

clientnameError !== null || 'undefined' ? addStyling(clientnameError) : console.log('its undefined');
ClientWebsiteError !== null || 'undefined' ? addStyling(ClientWebsiteError) : console.log('its undefined');
ClientadressError !== null || 'undefined' ? addStyling(ClientadressError) : console.log('its undefined');
ClientHouseNumberError !== null || 'undefined' ? addStyling(ClientHouseNumberError) : console.log('its undefined');
ClientCityError !== null || 'undefined' ? addStyling(ClientCityError) : console.log('its undefined');
ClientStateError !== null || 'undefined' ? addStyling(ClientStateError) : console.log('its undefined');
ClientLandError !== null || 'undefined' ? addStyling(ClientLandError) : console.log('its undefined');
ClientZipError !== null || 'undefined' ? addStyling(ClientZipError) : console.log('its undefined');
ClientFullAdressError !== null || 'undefined' ? addStyling(ClientFullAdressError): console.log('its undefined');


/*Functionality*/

/*--------------------------------------------UPDATE BY INPUT--------------------------------------------*/
addEventListener('input', function () {//get the input value from the form and paste it in the modal for review.
    // update the value in the modal where the clientname value is.
    modalclientname.innerHTML = clientname.value;

    // update the value in the modal where the website value is.
    modalwebsite.innerHTML = website.value;
    // get all adress-inputs then make an array of all the values. Then make a string format with the values. 
    addressInputs.forEach(input => {
        input.addEventListener('input', () => {
            let values = []; // array called values
            addressInputs.forEach(input => {
                if (input.value !== undefined) values.push(input.value); // insert every address input value in the values array
                else values.push(''); // if value is undefined, push an empty string instead
            });
            let fulladress = `${values[0]}, ${values[1]} ${values[2]}, ${values[3]} ${values[4]}, ${values[5]}`; // make string
            modaladress.innerHTML = fulladress; // update the string
        });
    });
});

/*--------------------------------------------UPDATE BY CHANGE--------------------------------------------*/
addEventListener('change', function () {
    //update the client name in the modal
    modalclientname.innerHTML = clientname.value;

    // update the website value in the modal
    modalwebsite.innerHTML = website.value;

    //when load update the adress in modal
    updateAddress();

});

/*--------------------------------------------UPDATE BY LOAD--------------------------------------------*/
addEventListener('load', function () {// update the modal when the page is loaded.
    //update the client name in the modal
    modalclientname.innerHTML = clientname.value;

    // update the website value in the modal
    modalwebsite.innerHTML = website.value;

    //when load update the adress in modal
    updateAddress();

});

/*--------------------------------------------DATA VALIDATION--------------------------------------------*/
savechanges.addEventListener('click', function () {// on click run these functions
    console.log('-------------------------------');

    // Variables
    let clientnamevalue = clientname.value;
    let websitevalue = website.value;
    let adressvalue = addressInputs[0].value;
    let numbervalue = addressInputs[1].value;
    let cityvalue = addressInputs[2].value;
    let statevalue = addressInputs[3].value;
    let landvalue = addressInputs[4].value;
    let zipvalue = addressInputs[5].value;

    //---------------------------------Functionality-----------------------------------------
    /*Client Name*/
    if (!clientnamevalue) {
        errorMessageclientname = 'Field is empty'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: empty field');
    } else if (clientnamevalue.length >= 50) {
        errorMessageclientname = 'Name has to be shorter'; // if clientnamevalue somehow is longer thanm 50 characters give this error message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: Shorter name');
    } else if (!Letterregex.test(clientnamevalue)) {
        errorMessageclientname = 'There cannot be numbers in this field'; // if clientnamevalue doesnt match this string regex, give this message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: number in field');
    } else {
        errorMessageclientname = '';
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        adressCorrection[0] = true;
        console.log(trueValues[0] + ': this index is 0 , M: gucci');
    }

    /*Website*/
    if (websitevalue.length === 0) {
        errorMessageWebsitevalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageWebsitevalue, ClientWebsiteError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1 , EM: Field empty`);
    } else if (!(urlPattern.test(websitevalue))) {
        errorMessageWebsitevalue = 'website is not valid';
        trueValues = updateFormValidation(errorMessageWebsitevalue, ClientWebsiteError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1 , EM: regex pattern doesnt match`);
    } else {
        errorMessageWebsitevalue = '';
        trueValues = updateFormValidation(errorMessageWebsitevalue, ClientWebsiteError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1 , M: gucci`);
    }

    /* Address */
    if (adressvalue.length === 0) {
        errorMessageAdressNumbervalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageAdressNumbervalue, ClientadressError, 2, trueValues);

        complete(errorMessageAdressNumbervalue, adressCorrection, 0);
        errorMessageClientFullAdressArray[0] = 'Missing field';  

        console.log(`${trueValues[2]}: this index is 2, EM: Field empty`);
    } else {
        errorMessageAdressNumbervalue = '';
        trueValues = updateFormValidation(errorMessageAdressNumbervalue, ClientadressError, 2, trueValues);

        complete(errorMessageAdressNumbervalue, adressCorrection, 0);
        errorMessageClientFullAdressArray[0] = '';
        console.log(`${trueValues[2]}: this index is 2, M: gucci`);
    }

    /* House Number */
    if (numbervalue.length === 0) {
        errorMessageHouseNumbervalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageHouseNumbervalue, ClientHouseNumberError, 3, trueValues);
        complete(errorMessageHouseNumbervalue, adressCorrection, 1);
        errorMessageClientFullAdressArray[1] = 'Missing field';
        console.log(`${trueValues[3]}: this index is 3, EM: Field empty`);
    } else {
        errorMessageHouseNumbervalue = '';
        trueValues = updateFormValidation(errorMessageHouseNumbervalue, ClientHouseNumberError, 3, trueValues);
        complete(errorMessageHouseNumbervalue, adressCorrection, 1);
        errorMessageClientFullAdressArray[1] = '';
        console.log(`${trueValues[3]}: this index is 3, M: gucci`);
    }

    /* City */
    if (cityvalue.length === 0) {
        errorMessageCityvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageCityvalue, ClientCityError, 4, trueValues);
        complete(errorMessageCityvalue, adressCorrection, 2);
        errorMessageClientFullAdressArray[2] = 'Missing field';
        console.log(`${trueValues[4]}: this index is 4, EM: Field empty`);
    } else {
        errorMessageCityvalue = '';
        trueValues = updateFormValidation(errorMessageCityvalue, ClientCityError, 4, trueValues);
        complete(errorMessageCityvalue, adressCorrection, 2);
        errorMessageClientFullAdressArray[2] = '';
        console.log(`${trueValues[4]}: this index is 4, M: gucci`);
    }

    /* State */
    if (statevalue.length === 0) {
        errorMessageStatevalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageStatevalue, ClientStateError, 5, trueValues);
        complete(errorMessageStatevalue, adressCorrection, 3);
        errorMessageClientFullAdressArray[3] = 'Missing field';
        console.log(`${trueValues[5]}: this index is 5, EM: Field empty`);
    } else {
        errorMessageStatevalue = '';
        trueValues = updateFormValidation(errorMessageStatevalue, ClientStateError, 5, trueValues);
        complete(errorMessageStatevalue, adressCorrection, 3);
        errorMessageClientFullAdressArray[3] = '';
        console.log(`${trueValues[5]}: this index is 5, M: gucci`);
    }

    /* Land */
    if (landvalue.length === 0) {
        errorMessageLandvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageLandvalue, ClientLandError, 6, trueValues);
        complete(errorMessageLandvalue, adressCorrection, 4);
        errorMessageClientFullAdressArray[4] = 'Missing field';
        console.log(`${trueValues[6]}: this index is 6, EM: Field empty`);
    } else {
        errorMessageLandvalue = '';
        trueValues = updateFormValidation(errorMessageLandvalue, ClientLandError, 6, trueValues);
        complete(errorMessageLandvalue, adressCorrection, 4);
        errorMessageClientFullAdressArray[4] = '';
        console.log(`${trueValues[6]}: this index is 6, M: gucci`);
    }

    /*Zip*/
    if (zipvalue.length === 0) {
        errorMessageZipvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageZipvalue, ClientZipError, 7, trueValues);
        complete(errorMessageZipvalue, adressCorrection, 5);
        errorMessageClientFullAdressArray[5] = 'Missing field';
        console.log(`${trueValues[7]}: this index is 7, EM: Field empty`);
    } else {
        errorMessageZipvalue = '';
        trueValues = updateFormValidation(errorMessageZipvalue, ClientZipError, 7, trueValues);
        complete(errorMessageZipvalue, adressCorrection, 5);
        errorMessageClientFullAdressArray[5] = '';
        console.log(`${trueValues[7]}: this index is 7, M: gucci`);
    }

    ClientFullAdressError.innerHTML = checkForEmptyValues(errorMessageClientFullAdressArray);
    
    //---------------------------------LAST FORM CHECKS-----------------------------------------
    if (adressCorrection.every((value => value === true))) {
        formvalidated = false;
    } else {
        formvalidated = true;
    }

    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 8) { // if the array contains 8 elements execute code
            console.log("All values in the array are true.");
            formvalidated = true; // formvalidated becomes true
            OfficiallySubmitForm.setAttribute('type', 'submit'); // change the type to submit
        }
    } else {
        console.log("Not all values in the array are true.");
        formvalidated = false; // formvalidated stays false
    }

    console.log(`formvalidated: ${formvalidated}`);
    console.log('-------------------------------');
});

/*--------------------------------------------SUBMIT FORM--------------------------------------------*/
OfficiallySubmitForm.addEventListener('click', function () { // when button clicked checks if the formvalidated is true, if well execute a submit.
    //---------------------------------BUTTON CLICK-----------------------------------------
    // if formvalidated is true, make an click event on the submit button.
    if (formvalidated) {
        OfficiallySubmitForm.click();
    }
    else {
        console.log('there is a problem in the inserted values');
        formvalidated = false; // formvalidated stays false
    }
});