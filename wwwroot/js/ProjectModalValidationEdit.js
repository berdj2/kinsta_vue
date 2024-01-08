'use strict';
/*Code for the Project edit details page*/

/*Functions*/
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
};

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

/*Variables*/
/*Form*/
const Projectname = document.getElementById('ProjectName');
const Contact = document.getElementById('ContactId');
const ProjectStatus = document.getElementById('ProjectStatus');
const Projectdeadline = document.getElementById('ProjectDeadline');
const Description = document.getElementById('Description');


/*Form Error*/
const ProjectNameError = document.querySelectorAll('.ProjectNameError');
const ContactError = document.querySelectorAll('.ContactError');
const StatusError = document.querySelectorAll('.StatusError');
const DeadlineError = document.querySelectorAll('.DeadlineError');
const DescriptionError = document.querySelectorAll('.DescriptionError');

/*Modal*/
const modalprojectname = document.getElementById('Projectnamemodal');
const Contactmodal = document.getElementById('Contactmodal');
const modalstatus = document.getElementById('Statusmodal');
const modaldeadline = document.getElementById('Deadlinemodal');
const modaldescription = document.getElementById('Descriptionmodal');

/*Buttons*/
const SubmitForm = document.getElementById('SubmitForm');
const OfficiallySubmitForm = document.getElementById('OfficiallySubmitForm');

/*Error message variables*/
let errorMessageProjectName = '';
let errorMessageContact = '';
let errorMessageStatus = '';
let errorMessageDeadline = '';
let errorMessageDescription = '';

/*Add Styling*/
addStyling(ProjectNameError);
addStyling(ContactError);
addStyling(StatusError);
addStyling(DeadlineError);
addStyling(DescriptionError);

/*Array Variables*/
let trueValues = [false, false, false, false, false];

/*true false variable*/
let formvalidated = false;

/*--------------------------------------------UPDATE BY INPUT--------------------------------------------*/
addEventListener('input', function () {
    // update the modal projectname value when there is an input in the projectname.
    modalprojectname.innerHTML = Projectname.value;
    // update the modal contact value when there is an input in the contact.
    Contactmodal.innerHTML = Contact.options[Contact.selectedIndex].textContent;
    // update the modal selectstatus value when there is an input in the selectstatus.
    ProjectStatus.checked ? modalstatus.innerHTML = 'on' : modalstatus.innerHTML = 'off';
    // update the modal deadline value when there is an input in the deadline.
    modaldeadline.innerHTML = Projectdeadline.value;
    // update the modal description value when there is an input in the description.
    modaldescription.innerHTML = Description.value;
});

/*--------------------------------------------UPDATE BY LOAD--------------------------------------------*/
addEventListener('load', function () {
    // update the modal projectname value when there is an input in the projectname.
    modalprojectname.innerHTML = Projectname.value;
    // update the modal clientname value when there is an input in the clientname.
    Contactmodal.innerHTML = Contact.options[Contact.selectedIndex].textContent;
    // update the modal selectstatus value when there is an input in the selectstatus.
    ProjectStatus.checked ? modalstatus.innerHTML = 'on' : modalstatus.innerHTML = 'off';
    // update the modal deadline value when there is an input in the deadline.
    modaldeadline.innerHTML = Projectdeadline.value;
    // update the modal description value when there is an input in the description.
    modaldescription.innerHTML = Description.value;
});

/*--------------------------------------------UPDATE BY CHANGE--------------------------------------------*/
addEventListener('change', function () {
    // update the modal projectname value when there is an input in the projectname.
    modalprojectname.innerHTML = Projectname.value;
    // update the modal clientname value when there is an input in the clientname.
    Contactmodal.innerHTML = Contact.options[Contact.selectedIndex].textContent;
    // update the modal selectstatus value when there is an input in the selectstatus.
    ProjectStatus.checked ? modalstatus.innerHTML = 'on' : modalstatus.innerHTML = 'off';
    // update the modal deadline value when there is an input in the deadline.
    modaldeadline.innerHTML = Projectdeadline.value;
    // update the modal description value when there is an input in the description.
    modaldescription.innerHTML = Description.value;
});

/*--------------------------------------------DATA VALIDATION--------------------------------------------*/
SubmitForm.addEventListener('click', function () { // onclick execute the code below.

    // form values
    let ProjectNameValue = Projectname.value;
    let ContactValue = Contact.value;
    let SelectStatusValue = ProjectStatus;
    let DeadlineValue = Projectdeadline.value;
    let DescriptionValue = Description.value;

    /*Project Name*/
    if (ProjectNameValue.length === 0) {
        errorMessageProjectName = 'Field Empty'; // if Project Name is empty give this message.
        trueValues = updateFormValidation(errorMessageProjectName, ProjectNameError, 0, trueValues);
        console.log(trueValues[0] + ': this index is 0 , EM: Empty Field');
    } else {
        errorMessageProjectName = ''; // if Project Name is empty give this message.
        trueValues = updateFormValidation(errorMessageProjectName, ProjectNameError, 0, trueValues);
        console.log(`${trueValues[0]}: this index is 0 , M: gucci`);
    }

    /*Client Name*/
    if (ContactValue.length === 0) {
        errorMessageContact = 'You have not selected'; // if Client Name is empty give this message.
        trueValues = updateFormValidation(errorMessageContact, ContactError, 1, trueValues);
        console.log(trueValues[1] + ': this index is 1 , EM: empty field');
    } else {
        errorMessageContact = ''; // if Client Name is empty give this message.
        trueValues = updateFormValidation(errorMessageContact, ContactError, 1, trueValues);
        console.log(`${trueValues[1]}: this index is 1 , M: gucci`);
    }

    /*Select Status*/
    if (SelectStatusValue.length === 0) {
        errorMessageDeadline = 'You have not selected'; // if Select Status is not empty but not valid, give this message.
        trueValues = updateFormValidation(errorMessageDeadline, StatusError, 2, trueValues);
        console.log(trueValues[2] + ': this index is 2 , EM: Not Valid');
    } else {
        errorMessageDeadline = ''; // if Select Status is valid or empty, no error message.
        trueValues = updateFormValidation(errorMessageDeadline, StatusError, 2, trueValues);
        console.log(`${trueValues[2]}: this index is 2 , M: gucci`);
    }

    /*Deadline*/
    if (DeadlineValue.length === 0) {
        errorMessageDeadline = 'You have not selected'; // if Deadline is empty give this message.
        trueValues = updateFormValidation(errorMessageDeadline, DeadlineError, 3, trueValues);
        console.log(trueValues[3] + ': this index is 3 , EM: Empty Field');
    } else {
        errorMessageDeadline = ''; // if Deadline is valid, clear the error message.
        trueValues = updateFormValidation(errorMessageDeadline, DeadlineError, 3, trueValues);
        console.log(`${trueValues[3]}: this index is 3 , M: gucci`);
    }

    /*Description*/
    if (DescriptionValue && DescriptionValue.trim().length !== 0) { 
        const descriptionRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+$/; // Regular expression to match letters, numbers, and symbols
        if (!descriptionRegex.test(DescriptionValue)) { // checks for suspicious text.
            errorMessageDescription = 'not valid'; // if DescriptionValue contains forbidden characters give this message.
            trueValues = updateFormValidation(errorMessageDescription, DescriptionError, 4, trueValues);
            console.log(trueValues[5] + ': this index is 4 , EM: forbidden characters');
        } else {
            errorMessageDescription = ''; // if false return this else 
            trueValues = updateFormValidation(errorMessageDescription, DescriptionError, 4, trueValues);
            console.log(`${trueValues[5]}: this index is 4 , M: gucci`);
        }
    } else {
        errorMessageDescription = ''; // if everything else is false return this else
        trueValues = updateFormValidation(errorMessageDescription, DescriptionError, 4, trueValues);
        console.log(`${trueValues[5]}: this index is 4 , M: gucci`);
    }

    //---------------------------------LAST FORM CHECKS-----------------------------------------

    // checks if the rest is true and executes a button click to confirm and send the form.
    if (trueValues.every(value => value === true)) { // if true get tpo the next if
        if (trueValues.length === 5) { // if the array contains 6 elements execute code
            console.log("All values in the array are true.");
            OfficiallySubmitForm.setAttribute('type', 'submit'); // change the type to submit
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
OfficiallySubmitForm.addEventListener('click', function () { // when button clicked checks if the formvalidated is true, if well execute a submit.
    //---------------------------------BUTTON CLICK-----------------------------------------
    // if formvalidated is true, make an click event on the submit button.
    if (formvalidated === true) {
        OfficiallySubmitForm.click();
    }
    else {
        console.log('there is a problem in the inserted values');
        formvalidated = false; // formvalidated stays false
    }
});