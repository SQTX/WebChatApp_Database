// Includes:
import { openTerminal } from "./terminal.js";
import { loadChatHeader, addNewMessage, loadConversation, clearChat } from "./messSys.js";

// *****************************************************************************
// Delay:
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
// *****************************************************************************
// Settings:
const settingsBtn = document.getElementById("settings-btn");

settingsBtn.addEventListener("click", () => {
  const menuBox = document.querySelector("menu");
  menuBox.classList.toggle("active");

  const addUser = document.querySelector("menu li.option:nth-child(1)");
  addUser.addEventListener('click', ()=>console.log("Add user func"));
  const terminalBtn = document.querySelector("menu li.option:nth-child(2)");
  terminalBtn.addEventListener('click', () => openTerminal());
});


// *****************************************************************************
// Add new message:
const itsMyMess = true;   // TODO: To remove

const sendBtn = document.getElementById("sendBtn");
const chatTextArea = document.getElementById("write-mess");

function getNowTime() {
  const now = new Date();
  // Date:
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  // Time:
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(time);
  return time;
}

function sendNewMessage(event) {
  event.preventDefault();
  const sentAt = getNowTime();

  let messTxt = chatTextArea.value;
  chatTextArea.value = "";            // Clean textarea

  // If it's empty do nothing:
  if(messTxt === "" || messTxt === "\n" || messTxt === "\r\n") return 0;

  addNewMessage(false, itsMyMess, messTxt);

  // Get inboxID:
  const chat = document.getElementById("chat");
  const inboxID = chat.getAttribute('active-inbox');

  // Send message to server:
  console.log(`Send new mess: "${messTxt}" on '${inboxID}' inbox at ${sentAt}.`);
  const url = `/chat/send/${inboxID}/${sentAt}/${messTxt}`;
  fetch(url, {
      method: 'POST',
  })
}


sendBtn.addEventListener('click', (event) => {
  sendNewMessage(event);
});
chatTextArea.addEventListener('keypress', (event) => {
  if(event.key === 'Enter'){
    sendNewMessage(event);
  }
});

// *****************************************************************************
// Swap frientd
delay(750).then(() => {
  const friendsList = document.getElementById("friends-list");
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
