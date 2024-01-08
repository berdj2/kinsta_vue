'use strict';

/*Variables*/

//get all the divs that has the 'downbutton' class.
const buttons = document.querySelectorAll('.downbutton');

// get all the divs that has 'dubbelpunt' class. 
const dubbelpunt = document.querySelectorAll('.dubbelpunt');

// get all the divs that has 'thevalue' class.
const thevalue = document.querySelectorAll('.thevalue');

/*functionality*/

// get the load event and run code, Remove attributes and classlist from the page, else do the opposite.
window.addEventListener('load', function () {
    // if window size is smaller than 576 pixels, remove these attributes and classes from the buttons variable.
    if (window.innerWidth > 576) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('btn', 'btn-light');
            buttons[i].removeAttribute('data-bs-toggle');
            buttons[i].removeAttribute('href');
            buttons[i].removeAttribute('role');
            buttons[i].removeAttribute('aria-expanded');
            buttons[i].removeAttribute('aria-controls');
        }
        // for every dubbelpunt display block.
        for (var i = 0; i < dubbelpunt.length; i++) {
            dubbelpunt[i].style.display = 'block';
        }
        // for every thevalue remove the collapse class and id.
        for (var i = 0; i < thevalue.length; i++) {
            thevalue[i].removeAttribute('id');
            thevalue[i].classList.remove('collapse');
        }
    }
    // Add attributes and classlist to the page.
    else {
        // for every button give it these attributes and classes.
        for (var i = 0; i < buttons.length; i++) {
            let n = i + 1;
            buttons[i].classList.add('btn', 'btn-light');
            buttons[i].setAttribute('data-bs-toggle', 'collapse');
            buttons[i].setAttribute('href', '#collapseExample' + n);
            buttons[i].setAttribute('role', 'button');
            buttons[i].setAttribute('aria-expanded', 'True');
            buttons[i].setAttribute('aria-controls', 'collapseExample' + n);
        }
        // for every dubbelpunt display = none.
        for (var i = 0; i < dubbelpunt.length; i++) {
            dubbelpunt[i].style.display = 'none';
        }
        // for every thevalue add class and attribute.
        for (var i = 0; i < thevalue.length; i++) {
            let n = i + 1;
            thevalue[i].classList.add('collapse');
            thevalue[i].setAttribute('id', 'collapseExample' + n);
        }
    }
});

// get the resize event and run code, Remove attributes and classlist from the page, else do the opposite.
window.addEventListener('resize', function () {
    // if window size is smaller than 576 pixels, remove these attributes and classes from the buttons variable.
    if (window.innerWidth > 576) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('btn', 'btn-light');
            buttons[i].removeAttribute('data-bs-toggle');
            buttons[i].removeAttribute('href');
            buttons[i].removeAttribute('role');
            buttons[i].removeAttribute('aria-expanded');
            buttons[i].removeAttribute('aria-controls');
        }
        // for every dubbelpunt display block.
        for (var i = 0; i < dubbelpunt.length; i++) {
            dubbelpunt[i].style.display = 'block';
        }
        // for every thevalue remove the collapse class and id.
        for (var i = 0; i < thevalue.length; i++) {
            thevalue[i].removeAttribute('id');
            thevalue[i].classList.remove('collapse');
        }
    }
    // Add attributes and classlist to the page.
    else {
        // for every button give it these attributes and classes.
        for (var i = 0; i < buttons.length; i++) {
            let n = i + 1;
            buttons[i].classList.add('btn', 'btn-light');
            buttons[i].setAttribute('data-bs-toggle', 'collapse');
            buttons[i].setAttribute('href', '#collapseExample' + n);
            buttons[i].setAttribute('role', 'button');
            buttons[i].setAttribute('aria-expanded', 'True');
            buttons[i].setAttribute('aria-controls', 'collapseExample' + n);
        }
        // for every dubbelpunt display = none.
        for (var i = 0; i < dubbelpunt.length; i++) {
            dubbelpunt[i].style.display = 'none';
        }
        // for every thevalue add class and attribute.
        for (var i = 0; i < thevalue.length; i++) {
            let n = i + 1;
            thevalue[i].classList.add('collapse');
            thevalue[i].setAttribute('id', 'collapseExample' + n);
        }
    }
});
