// Includes:
import { delay } from "./time.js";
import { openTerminal, printLog } from "./terminal.js";
import { openAddFriendWindow } from "./addFriend.js";
import {
  loadChatHeader,
  loadConversation,
  addLoadBar,
  clearChat,
  sendNewMessage,
} from "./messSys.js";

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
  addUser.addEventListener("click", () => openAddFriendWindow());
  const terminalBtn = document.querySelector("menu li.option:nth-child(2)");
  terminalBtn.addEventListener("click", () => openTerminal());
});

// =====================================================================================================
// Send new message:
const sendBtn = document.getElementById("sendBtn");
const chatTextArea = document.getElementById("write-mess");
// Calling the message sending function:
sendBtn.addEventListener("click", (event) => {
  sendNewMessage(event, userID);
  printLog(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque est similique rerum non esse! Unde officia totam iste laudantium tenetur."
  );
});
chatTextArea.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendNewMessage(event, userID);
  }
});

// =====================================================================================================
// Swapping the chat with another friend:
delay(750).then(() => {
  const friends = document.querySelectorAll("#friends-list div.friend");
  console.log(friends);
  friends.forEach((friend) => {
    friend.addEventListener("click", () => {
      const friendID = friend.getAttribute("friendid");
      const nicknameP = friend.querySelector("span p.nickname");
      const nickname = nicknameP.innerText;
      console.log(friendID, "Przyjaciel", nickname);

      const imgElem = friend.querySelector("div.profile-img img");
      const profilePhoto = imgElem.getAttribute("src");

      loadChatHeader(nickname, true, profilePhoto); // NOTE: Hard coded friend status
      clearChat();
      loadConversation(friendID);
    });
  });
});


// =====================================================================================================
// Load older messages after max scroll chat up:
const chat = document.getElementById("chat");
chat.addEventListener("scroll", (event) => {
  let scroll = chat.scrollTop;

  const loadBar = document.getElementById("load-chat");
  console.log("Loading older messages");
  if (scroll === 0 && !loadBar) {
    delay(150).then(() => addLoadBar());
  }
});
