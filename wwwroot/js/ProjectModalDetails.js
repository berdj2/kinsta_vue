'use strict';

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

// // Get references to the input fields
const dateStartTimeInput = document.getElementById('DateStartTime');
const dateEndTimeInput = document.getElementById('DateEndTime');
const dateTimeDiffInput = document.getElementById('DateTimeDiff');

// Modal Values
let ModalDateStartTime = document.getElementById('ModalDateStartTime');
let ModalDateEndTime = document.getElementById('ModalDateEndTime');
let ModalDateTimeDiff = document.getElementById('ModalDateTimeDiff');

// Error input values
let StartTimeError = document.querySelectorAll('.StartTimeError');
let EndTimeError = document.querySelectorAll('.EndTimeError');
let TimeDiffError = document.querySelectorAll('.TimeDiffError');

//buttons
let OfficiallySubmitForm = document.getElementById('OfficiallySubmitForm');
let savechanges = document.getElementById('savechanges');

// error values
let errorMessageDateStartTime = '';
let errorMessageDateEndTime = '';
let errorMessageDateTimeDiff = '';

// variable for if the form is valid or not
let formvalidated = false;
// array to store values
let trueValues = [false, false, false];

// add styling
dateStartTimeInput !== null || 'undefined' ? addStyling(StartTimeError) : console.log('its undefined');
dateEndTimeInput !== null || 'undefined' ? addStyling(EndTimeError) : console.log('its undefined');
dateTimeDiffInput !== null || 'undefined' ? addStyling(TimeDiffError) : console.log('its undefined');

/*--------------------------------------------UPDATE BY INPUT, CHANGE, LOAD, CLICK--------------------------------------------*/
function updateModalContent() {
    //update the client name in the modal
    ModalDateStartTime.innerHTML = dateStartTimeInput.value;
    ModalDateEndTime.innerHTML = dateEndTimeInput.value;
    ModalDateTimeDiff.innerHTML = dateTimeDiffInput.value;
};

// Add event listeners to the same function for multiple event types to update the modal
['input', 'change', 'load'].forEach(function (eventType) {
    window.addEventListener(eventType, updateModalContent);
});


function updateDateTimeDiff() {
    // Get the start and end date values from the input elements
    const startDate = new Date(dateStartTimeInput.value);
    const endDate = new Date(dateEndTimeInput.value);

    // Check if the input values are valid date objects
    if (!isNaN(startDate) && !isNaN(endDate)) {
        // Calculate the time difference in milliseconds
        const timeDiff = endDate - startDate;

        // Calculate the number of hours and minutes
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        // Check if the calculated hours are greater than or equal to 48
        if (hours >= 48) {
            // Display an error message in red
            dateTimeDiffInput.value = 'Invalid Input';
            dateTimeDiffInput.style.color = 'red';
        } else if (hours < 0 || minutes < 0 || (hours === 0 && minutes === 0)) {
            // Check for negative values or zero time
            // Display an error message in red
            dateTimeDiffInput.value = 'Invalid Input';
            dateTimeDiffInput.style.color = 'red';
        } else {
            // Format the time difference as "hh:mm" and set it in black
            const formattedTimeDiff = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            dateTimeDiffInput.value = formattedTimeDiff;
            dateTimeDiffInput.style.color = 'black';
        }
    } else {
        // Display an error message in red if the input values are not valid dates
        dateTimeDiffInput.value = 'Invalid Input';
        dateTimeDiffInput.style.color = 'red';
    }
}

// Add event listeners to the DateStartTime and DateEndTime inputs
dateStartTimeInput.addEventListener("input", updateDateTimeDiff);
dateEndTimeInput.addEventListener("input", updateDateTimeDiff);

savechanges.addEventListener('click', function() 
{
    if (dateStartTimeInput.value.length <= 0) {
        errorMessageDateStartTime = 'Field is empty'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateStartTime, StartTimeError, 0, trueValues);
    }
    else {
        errorMessageDateStartTime = ''; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateStartTime, StartTimeError, 0, trueValues);
    }

    if (dateEndTimeInput.value.length <= 0) {
        errorMessageDateEndTime = 'Field is empty'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateEndTime, EndTimeError, 1, trueValues);
    } 
    else {
        errorMessageDateEndTime = ''; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateEndTime, EndTimeError, 1, trueValues);
    }

    if (dateTimeDiffInput.value.length <= 0) {
        errorMessageDateTimeDiff = 'Field is empty'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateTimeDiff, TimeDiffError, 2, trueValues);
    }
    else if(dateTimeDiffInput.value == 'Invalid Input') {
        errorMessageDateTimeDiff = 'Invalid Input'; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateTimeDiff, TimeDiffError, 2, trueValues);
    }
    else {
        errorMessageDateTimeDiff = ''; // if clientnamevalue is empty give this message.
        trueValues = updateFormValidation(errorMessageDateTimeDiff, TimeDiffError, 2, trueValues);
    }

    //---------------------------------LAST FORM CHECKS-----------------------------------------
    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 3) { // if the array contains 8 elements execute code
            formvalidated = true; // formvalidated becomes true
            OfficiallySubmitForm.setAttribute('type', 'submit'); // change the type to submit
        }
    } else {
        formvalidated = false; // formvalidated stays false
    }
});

/*--------------------------------------------SUBMIT FORM--------------------------------------------*/
OfficiallySubmitForm.addEventListener('click', function () { // when button clicked checks if the formvalidated is true, if well execute a submit.
    //---------------------------------BUTTON CLICK-----------------------------------------
    // if formvalidated is true, make an click event on the submit button.
    if (formvalidated) {
        OfficiallySubmitForm.click();
    }
    else {
        formvalidated = false; // formvalidated stays false
    }
});