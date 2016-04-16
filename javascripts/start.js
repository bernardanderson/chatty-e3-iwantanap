"use strict";

// Loads last in HTML in order to access all necessary files
//GETTING BASE FILES: loads all messages from XHR and places them on to dom
Chatty.loadMessages(Chatty.onToDom);

//GETS CURRENT USERS: outputs default users to select menu
Chatty.addUsersToDom();
