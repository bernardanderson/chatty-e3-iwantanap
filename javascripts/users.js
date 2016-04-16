"use strict";

var Chatty = ((oldChatty) => {

    // Creates private user array that can be added with augmented method. var instead of let because it will be used throughout this augmentation
    var users = {
        names: ["Xavier", "Joanna", "Mackenzie", "Gunter", "Iveta", "Sven"]
    };

    // Gets new user info from eventListeners.js and pushes it to an array which then gets reloaded into the select element on dom
    oldChatty.addUsers = (newUser) => { 
        users.names.push(newUser);
        Chatty.addUsersToDom();
    };

    // Cycles through private array of users and appends them to the select user menu each time the array is edited
    oldChatty.addUsersToDom = () => {
        let userArray = users.names;
        let buildUserDropDown = "";
        $(userArray).each( function() {
          buildUserDropDown += `<option value=${this}>${this}</option>`;
        });
        $("#user-dropdown").html(`<option value="defaultVal">Select User</option>${buildUserDropDown}<option value="addUser">+Add User</option>`);
    };


    // Selects users at time of message being entered and returns the value
    oldChatty.selectUsers  = () => { 
        // let selectedUser = document.getElementById("user-dropdown").value; 
        let selectedUser = $("#user-dropdown").val();
        if (selectedUser === "defaultVal") {
            alert("Select a user, bozo.");
        } else if (selectedUser === "addUser"){ 
            selectedUser = "Idiot"; //If user somehow gets through both prompts without adding their name, they are assigned appropriate name value
            return selectedUser;
        } else {
            return selectedUser;
        }
    };

    oldChatty.getUsers = () => {
        return users;
    };


    return oldChatty;
})(Chatty);