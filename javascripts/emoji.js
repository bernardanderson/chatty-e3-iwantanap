"use strict";

var Chatty = ( (oldChatty) => {

  // The current emoji list of [] === <img>
  let emojiList = {
    "[happy]": '<img src="emoji/happy.png">',
    "[sleepy]": '<img src="emoji/sleepy.png">',
    "[poopy]": '<img src="emoji/poopy.png">'
  };

  // Converts Emoji [ ] tags to <img> tags for any message text
  oldChatty.addEmoji = (sentMessageString) => {
    for (let emojiKey in emojiList) {
      if (sentMessageString.includes(emojiKey)) {
        sentMessageString = sentMessageString.replace(emojiKey, emojiList[emojiKey]);
      }
    }
    return sentMessageString;
  };

  // Removes Emoji <img> tags for messages so the returned message text
  //  looks like what the user type (for editing)
  oldChatty.removeEmoji = (sentMessageString) => {
    for (let emojiKey in emojiList) {
      if (sentMessageString.includes(emojiList[emojiKey])) {
        sentMessageString = sentMessageString.replace(emojiList[emojiKey], emojiKey);
      }
    }
    return sentMessageString;
  };

  return oldChatty;

})(Chatty);