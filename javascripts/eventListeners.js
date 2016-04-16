"use strict";

// ******************************** ALL KEYPRESS EVENTS ********************************>
// NAV: When return key is detected, you'll create a new message.
$("body").bind("keypress", function() {
  if ($(event.target).attr("id") === "message-input" && event.which === 13 || $(event.target).attr("id") === "user-dropdown" && event.which === 13 && $('#message-input').val() !== "") { 
      if ($("#user-dropdown").val() === "defaultVal") {  //checks to make sure a user is selected. does not default to a specific value for UX, don't want to accidentally have all messages posted from first item in the array
            alert("Select a user, bozo.");
      } else {
        Chatty.createNewMessage();  //creates a new message object by sending it a function that builds the object, another function that pushes it to the array and then another function that outputs it to dom
        setTimeout(Chatty.chooseAI, Math.floor(Math.random()* 5000));  //creates unique and random response time for AI to respond to user's message entry
        $("#message-input").val("");  //resets the main input field
    }
  }
});

// ********************************* ALL CLICK EVENTS *********************************>
// MESSAGE BOARD: Clears most recent 20 messages in message board
$("body").click( function() {
  // NAV: When the user clicks the clear messages button, all current chat messages should be removed from the application.
  if ($(event.target).attr("id") === "clear-board") {
    let boardLeftovers = Chatty.getMessages().length - 21;  //sets up a variable that will access all but the last 20 messages
    for (let i = Chatty.getMessages().length - 1; i > boardLeftovers && i > -1; i--) {  //cycles (backward) through the array and selects the 20 most recent items
      Chatty.deleteMessage(i);  //deletes each of the 20 last messages on the board from the private messages array (see chatty.js for further info)
      Chatty.onToDom();  //cycles through current array (any remaining messages beyond 20) and the next >= 20 messages and outputs them to DOM (see chatty.js for further info)
    }
  }

  // INDIVIDAL MESSAGE: When the user clicks the delete messages beside a message, that message is removed from private array
  if ($(event.target).hasClass("deleteThisMessage")) {  //each delete button has a class of deleteThisMessage. this detects to see if clicked item contains that class
    // This selects the div container holding the delete button and gets it's unique id
    Chatty.deleteSingleMessage($(event.target).parents(".container-fluid").eq(0).attr("id"));  //sends message ID into delete message that removes it from the array before it cycles through and outputs items to DOM again (see chatty.js for further info)
  }

  // INDIVIDAL MESSAGE: When the user clicks the delete messages beside a message, that message is removed from private array
  if ($(event.target).hasClass("editThisMessage")) {  //each select button has a class of editThisMessage. this detects to see if clicked item contains that class
    Chatty.editModeFunc($(event.target).parents(".container-fluid")[0]);  //sends full message to editMode (see edit.js for further info)
  }
  // ACCESSIBILITY FEATURE: Turns background gray and color white by adding a CSS class
  if ($(event.target).attr("id") === "dark-theme") {  //modal: the dark-theme checkbox has an ID of "dark-theme". if value is checked, it returns true and procedes to classList.add function
    $("body").toggleClass("dark-theme");  //applies dark theme (regardless of any other themes applied)
  }

  // ACCESSIBILITY FEATURE: Enlarges all text within the message area by adding a specific class to the container
  if ($(event.target).attr("id") === "large-text") {  //modal: the large-text checkbox has an ID of "large-text". if value is checked, it returns true and procedes to classList.add function
    $("#message-area").toggleClass("larger-text");  //applies large text (regardless of any other themes applied)
  }

  // FUN THEMES: User is able to select from 4 themes via model 
  //removes all the old themes so only new one is applied adds user's selected theme to the body

  switch ($(event.target).attr("id")) {
    case "theme1":
    $("body").removeClass("theme2 theme3 theme4").addClass("theme1");
    break;
    case "theme2":
    $("body").removeClass("theme1 theme3 theme4").addClass("theme2");
    break;
    case "theme3":
    $("body").removeClass("theme1 theme2 theme4").addClass("theme3");  
    break;
    case "theme4":
    $("body").removeClass("theme1 theme2 theme3").addClass("theme4");
    break;
    case "themeNone":
    $("body").removeClass("theme1 theme2 theme3 theme4");  //removes all the old themes
    break;
  }
});

// ********************************* ALL CHANGE EVENTS *********************************>
// USER OPTIONS MENU: Applies user to each message, allows system admin to add users to private array before they are output to DOM
$("body").bind("change", function() {
  if ($(event.target).val() === "addUser" && $(event.target).prop("tagName") === "SELECT") {  //checks to ensure the click event is for both the dropdown menu and that the "addUser" value is selected
    let newUser = prompt("Name of new user");  //creates a new variable with the string output by user's input into the prompt
    if (newUser !== "") {  //checks to make sure user didn't simply hit "okay" on prompt box - resulting in an empty string
      Chatty.addUsers(newUser); //sends user's prompt input as a string into users array (see chatty.js for further info)
      let newestUser = Chatty.getUsers()[Chatty.getUsers().length - 1]; //when the user adds a new user, the dropdown defaults to that value
      $("#user-dropdown").val(newUser);
    } else {
      newUser = prompt("Name of new user"); //prompts user again in case they exited the user prompt accidentally with a blank string for a value
    }
  }
});