// Includes:
import { getNowTime, delay } from "./time.js";
import { openTerminal } from "./terminal.js";
import { loadChatHeader, loadConversation, clearChat, sendNewMessage } from "./messSys.js";

// =====================================================================================================
// Constant:
const userID = 1;
// const userID = getUserID();

// =====================================================================================================
// Settings control:
const settingsBtn = document.getElementById("settings-btn");

settingsBtn.addEventListener("click", () => {
  const menuBox = document.querySelector("menu");
  menuBox.classList.toggle("active");

  const addUser = document.querySelector("menu li.option:nth-child(1)");
  addUser.addEventListener('click', ()=>console.log("Add user func"));
  const terminalBtn = document.querySelector("menu li.option:nth-child(2)");
  terminalBtn.addEventListener('click', () => openTerminal());
});

// =====================================================================================================
// Send new message:
const sendBtn = document.getElementById("sendBtn");
const chatTextArea = document.getElementById("write-mess");
// Calling the message sending function:
sendBtn.addEventListener('click', (event) => {
  sendNewMessage(event, userID);
});
chatTextArea.addEventListener('keypress', (event) => {
  if(event.key === 'Enter'){
    sendNewMessage(event, userID);
  }
});

// =====================================================================================================
// Swapping the chat with another friend:
delay(750).then(() => {
  const friends = document.querySelectorAll("#friends-list div.friend");
  console.log(friends);
  friends.forEach(friend => {
    friend.addEventListener('click', () => {
      const friendID = friend.getAttribute("friendid");
      const nicknameP = friend.querySelector("span p.nickname");
      const nickname = nicknameP.innerText;
      console.log(friendID, "Przyjaciel", nickname);

      const imgElem = friend.querySelector("div.profile-img img");
      const profilePhoto = imgElem.getAttribute('src');

      loadChatHeader(nickname, true, profilePhoto);   // NOTE: Hard coded friend status
      clearChat();
      loadConversation(friendID);
    })
  });
});
