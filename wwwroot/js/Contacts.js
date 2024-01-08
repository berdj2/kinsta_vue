'use strict';

/*Variables*/

//get all buttons that has a 'btn btn-info' class.
const buttonlist = document.querySelectorAll("btn btn-info");

/*functionality*/

//for every a tag button change the colors to white and remove the link decoration.
for (var i = 0; i < buttonlist.length; i++) {
    buttonlist[i].style.color = 'white !important';
    buttonlist[i].style.textDecoration = 'none !important';
    console.log(buttonlist[i]); 
}
