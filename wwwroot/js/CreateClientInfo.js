'use strict';

/*Functions*/

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
    if (errorElements === null) {
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


/*variables*/
let clicks = 0;

/*Form*/

let clientname = document.getElementById('ClientName');
let Street = document.getElementById('Street');
let ZipCode = document.getElementById('ZipCode');
let State = document.getElementById('State');
let City = document.getElementById('City');
let Country = document.getElementById('Country');
let AddressNum = document.getElementById('AdressNum');

/*Modal*/
let modalclientname = document.getElementById('modalCompanyName');
let modalStreet = document.getElementById('modalStreet');
let modalZipcode = document.getElementById('modalZipcode');
let modalState = document.getElementById('modalState');
let modalCity = document.getElementById('modalCity');
let modalCountry = document.getElementById('modalCountry');
let modalAdressNum = document.getElementById('modalAdressNum');

/*Form/modal Error*/
let clientnameError = document.querySelectorAll('.CompanyNameError');
let ClientadressError = document.querySelectorAll('.StreetError');
let ClientZipError = document.querySelectorAll('.ZipcodeError');
let ClientStateError = document.querySelectorAll('.StateError');
let ClientCityError = document.querySelectorAll('.CityError');
let ClientLandError = document.querySelectorAll('.CountryError');
let ClientHouseNumberError = document.querySelectorAll('.AdressNumError');
let modalerror = document.querySelector('.modalerror');


/*Error message variables*/
let errorMessageclientname = ''; // create empty errormessage variable
let errorMessageAdressvalue = ''; // create empty errormessage variable
let errorMessageZipvalue = ''; // create empty errormessage variable
let errorMessageStatevalue = ''; // create empty errormessage variable
let errorMessageCityvalue = ''; // create empty errormessage variable
let errorMessageLandvalue = ''; // create empty errormessage variable
let errorMessageHouseNumbervalue = ''; // create empty errormessage variable

/*Buttons*/
const savechanges = document.getElementById('saveChangesButton');
const OfficiallySubmitForm = document.getElementById('OfficiallySubmitForm');

// create a boolean to trigger a button click
let formvalidated = false;

// match strings that contains only these letters.
const Letterregex = /^[a-zA-Z]*$/; // regex
// const Letterregex = /^[^'&quot;$*()\-_]*$/; // regex

// create an empty array, that matches the amount of inputs in the form.
let trueValues = [false, false, false, false, false, false, false];

/*Add Styling*/

clientnameError !== null || 'undefined' ? addStyling(clientnameError) : console.log('its undefined');
ClientadressError !== null || 'undefined' ? addStyling(ClientadressError) : console.log('its undefined');
ClientZipError !== null || 'undefined' ? addStyling(ClientZipError) : console.log('its undefined');
ClientStateError !== null || 'undefined' ? addStyling(ClientStateError) : console.log('its undefined');
ClientCityError !== null || 'undefined' ? addStyling(ClientCityError) : console.log('its undefined');
ClientLandError !== null || 'undefined' ? addStyling(ClientLandError) : console.log('its undefined');
ClientHouseNumberError !== null || 'undefined' ? addStyling(ClientHouseNumberError) : console.log('its undefined');

/*Functionality*/


/*--------------------------------------------UPDATE BY INPUT, CHANGE, LOAD, CLICK--------------------------------------------*/
function updateModalContent() {
    // Update the value in the modal where the clientname value is.
    clientname.length !== 0 ? modalclientname.innerHTML = clientname.options[clientname.selectedIndex].textContent : '';
    modalStreet.innerHTML = Street.value;
    modalZipcode.innerHTML = ZipCode.value;
    modalState.innerHTML = State.value;
    modalCity.innerHTML = City.value;
    modalCountry.innerHTML = Country.value;
    modalAdressNum.innerHTML = AddressNum.value;
}

// Add event listeners to the same function for multiple event types to update the modal
['input', 'change', 'load'].forEach(function (eventType) {
    window.addEventListener(eventType, updateModalContent);
});

/*--------------------------------------------DATA VALIDATION--------------------------------------------*/
savechanges.addEventListener('click', function () {// on click run these functions
    console.log('-------------------------------');

    // Variables
    let clientnamevalue = clientname.value;
    let adressvalue = Street.value;
    let zipvalue = ZipCode.value;
    let statevalue = State.value;
    let cityvalue = City.value;
    let landvalue = Country.value;
    let numbervalue = AddressNum.value;

    //---------------------------------Functionality-----------------------------------------
    /*Client Name*/
    if (!clientnamevalue) {
        errorMessageclientname = 'select a company'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: empty field');
    } else if (clientnamevalue.length === 0) {
        errorMessageclientname = 'select a company'; // if clientnamevalue somehow is longer thanm 50 characters give this error message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: select a company');
    } else {
        errorMessageclientname = '';
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , M: gucci');
    }

    /* Address */
    if (adressvalue.length === 0) {
        errorMessageAdressvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageAdressvalue, ClientadressError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1, EM: Field empty`);
    } else {
        errorMessageAdressvalue = '';
        trueValues = updateFormValidation(errorMessageAdressvalue, ClientadressError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1, M: gucci`);
    }

    /* House Number */
    if (numbervalue.length === 0) {
        errorMessageHouseNumbervalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageHouseNumbervalue, ClientHouseNumberError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2, EM: Field empty`);
    } else {
        errorMessageHouseNumbervalue = '';
        trueValues = updateFormValidation(errorMessageHouseNumbervalue, ClientHouseNumberError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2, M: gucci`);
    }

    /* City */
    if (cityvalue.length === 0) {
        errorMessageCityvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageCityvalue, ClientCityError, 3, trueValues);
        console.log(`${trueValues[3]}: this index is 3, EM: Field empty`);
    } else {
        errorMessageCityvalue = '';
        trueValues = updateFormValidation(errorMessageCityvalue, ClientCityError, 3, trueValues);
        console.log(`${trueValues[3]}: this index is 3, M: gucci`);
    }

    /* State */
    if (statevalue.length === 0) {
        errorMessageStatevalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageStatevalue, ClientStateError, 4, trueValues);
        console.log(`${trueValues[4]}: this index is 4, EM: Field empty`);
    } else {
        errorMessageStatevalue = '';
        trueValues = updateFormValidation(errorMessageStatevalue, ClientStateError, 4, trueValues);
        console.log(`${trueValues[4]}: this index is 4, M: gucci`);
    }

    /* Land */
    if (landvalue.length === 0) {
        errorMessageLandvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageLandvalue, ClientLandError, 5, trueValues);
        console.log(`${trueValues[5]}: this index is 5, EM: Field empty`);
    } else {
        errorMessageLandvalue = '';
        trueValues = updateFormValidation(errorMessageLandvalue, ClientLandError, 5, trueValues);
        console.log(`${trueValues[5]}: this index is 5, M: gucci`);
    }

    /*Zip*/
    if (zipvalue.length === 0) {
        errorMessageZipvalue = 'Field is empty';
        trueValues = updateFormValidation(errorMessageZipvalue, ClientZipError, 6, trueValues);
        console.log(`${trueValues[6]}: this index is 6, EM: Field empty`);
    } else {
        errorMessageZipvalue = '';
        trueValues = updateFormValidation(errorMessageZipvalue, ClientZipError, 6, trueValues);
        console.log(`${trueValues[6]}: this index is 6, M: gucci`);
    }
    
    //---------------------------------LAST FORM CHECKS-----------------------------------------
    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 7) { // if the array contains 8 elements execute code
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

    clicks++;

    if (clicks >= 4) { // if clicks is or is more than 4 give message 
        modalerror.innerHTML = 'Contact the admin for help, if the problem persist'
    }
    else if (formvalidated) { // if formvalidated is true, make an click event on the submit button.
        modalerror.innerHTML = '';
        OfficiallySubmitForm.click();
    }
    else {
        modalerror.innerHTML = 'Something is missing or not inserted correctly'
        console.log('there is a problem in the inserted values');
        formvalidated = false; // formvalidated stays false
    }
});