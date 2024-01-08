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


/*variables*/

/*Form*/
let clientname = document.querySelector('#ClientName');
let website = document.querySelector('#ClientWebsite'); // selects the website input field.
let clientstatus = document.getElementById('ClientStatus'); // selects clientstatus element

console.log(clientstatus);
console.log(clientstatus.value);
console.log(clientstatus.length);
console.log(clientstatus.checked);

/*Modal*/
let modalclientname = document.querySelector('#modalClientName');
let modalwebsite = document.querySelector('#modalWebsite'); // selects the modal element for the website.
let modalclientstatus = document.querySelector('#modalClientStatus'); // selects the modal element for the clientstatus output.

/*Form Error*/
let clientnameError = document.querySelectorAll('.clientnameError');
let ClientWebsiteError = document.querySelectorAll('.ClientWebsiteError');
let statusError = document.querySelectorAll('.StatusError');

/*Error message variables*/
let errorMessageclientname = ''; // create empty errormessage variable
let errorMessageWebsitevalue = ''; // create empty errormessage variable
let errorMessagestatusvalue = ''; // create empty errormessage variable

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
let trueValues = [false, false, false];

/*Add Styling*/

clientnameError !== null || 'undefined' ? addStyling(clientnameError) : console.log('its undefined');
ClientWebsiteError !== null || 'undefined' ? addStyling(ClientWebsiteError) : console.log('its undefined');
statusError !== null || 'undefined' ? addStyling(statusError) : console.log('its undefined');



/*Functionality*/

/*--------------------------------------------UPDATE BY INPUT, CHANGE, LOAD, CLICK--------------------------------------------*/
function updateModalContent() {
    //update the client name in the modal
    modalclientname.innerHTML = clientname.value;

    // update the website value in the modal
    modalwebsite.innerHTML = website.value;

    // checks if status is checked or not. if wel give the modal a on or off value for the status.
    clientstatus.checked ? modalclientstatus.innerHTML = 'on' : modalclientstatus.innerHTML = 'off';

};

// Add event listeners to the same function for multiple event types to update the modal
['input', 'change', 'load'].forEach(function (eventType) {
    window.addEventListener(eventType, updateModalContent);
});

/*--------------------------------------------DATA VALIDATION--------------------------------------------*/
savechanges.addEventListener('click', function () {// on click run these functions
    console.log('-------------------------------');

    // Variables
    let clientnamevalue = clientname.value;
    let websitevalue = website.value;
    let statusvalue = clientstatus.value;

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
        errorMessageclientname = 'There can only be letters in this field'; // if clientnamevalue doesnt match this string regex, give this message.
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: not letterfull in field');
    } else {
        errorMessageclientname = '';
        trueValues = updateFormValidation(errorMessageclientname, clientnameError, 0, trueValues);
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

    /* status */
    if (statusvalue.length === 0) {
        errorMessagestatusvalue = 'Field is undefined';
        trueValues = updateFormValidation(errorMessagestatusvalue, statusError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2, EM: Field undefined`);
    } else {
        errorMessagestatusvalue = '';
        trueValues = updateFormValidation(errorMessagestatusvalue, statusError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2, M: gucci`);
    }
    
    //---------------------------------LAST FORM CHECKS-----------------------------------------
    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 3) { // if the array contains 8 elements execute code
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