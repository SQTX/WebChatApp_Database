import { delay, getNowTime } from "./time.js";

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
function addNewMessage(
  loadMode = false,
  amIAuthor,
  messTxt,
  isLast = false,
  sentAt = 0
) {
  const chat = document.getElementById("chat");

  const message = document.createElement("p");
  message.innerText = messTxt;

  const messBubble = document.createElement("div");
  messBubble.classList.add("message");
  if (amIAuthor) {
    messBubble.classList.add("user-mess");
  } else {
    messBubble.classList.add("friend-mess");
  }
  if (isLast) {
    // Delete previous last element:
    const prevLastMess = document.getElementById("last-loaded");
    if (prevLastMess !== null) {
      prevLastMess.removeAttribute("id");
      prevLastMess.removeAttribute("sentAt");
    }

    // Add new last element:
    messBubble.id = "last-loaded";
    messBubble.setAttribute("sentAt", sentAt);
  }
  messBubble.appendChild(message);

  // Add messBubble to chat interface (in one of two way)
  if (loadMode) chat.insertBefore(messBubble, chat.firstChild);
  else chat.appendChild(messBubble);

  // Automatic scroll down:
  messBubble.scrollIntoView();
  messBubble.scrollIntoView({ behavior: "smooth" });
}

function setInboxOnChat(inboxID) {
  const chat = document.getElementById("chat");
  chat.setAttribute("active-inbox", inboxID);
}

function loadMessages(data) {
  console.log(data);
  // data.reverse();
  data.forEach((message, index) => {
    const { authorID, sentAt, messTxt } = message;
    console.log("Wiadomość:", authorID, sentAt, messTxt);

    const amIAuthor = authorID === 1 ? true : false;
    if (index === data.length - 1)
      addNewMessage(true, amIAuthor, messTxt, true, sentAt); // Last loaded mess
    else addNewMessage(true, amIAuthor, messTxt);
  });
}

function removeLoadBar() {
  const loadBar = document.getElementById("load-chat");
  if (loadBar) loadBar.remove();
}

function loadOlderMessages() {
  const inboxID = chat.getAttribute("active-inbox");

  const lastLoadedMessTime = document
    .getElementById("last-loaded")
    .getAttribute("sentat");

  loadMoreMessages(inboxID, lastLoadedMessTime);
}

// Load older messages to chat:
function loadMoreMessages(inboxID, lastMessTime = 0) {
  if (lastMessTime === 0) lastMessTime = getNowTime();
  const messNumber = "";

  fetch(`/chat/load/mess/${inboxID}/${lastMessTime}/${messNumber}`, {
    method: "GET",
  }).then((r) => r.json().then((data) => loadMessages(data)));
}

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
// Remove all message bubbles from chat:
export function clearChat() {
  const chat = document.getElementById("chat");
  const messages = chat.querySelectorAll("div.message");
  messages.forEach((message) => {
    message.remove();
  });
}

// Load new chat header:
export function loadChatHeader(nickname, active, profilePhoto) {
  const header = document.getElementById("chat-header");

  // Change name
  const nicknameP = header.querySelector("p.nickname");
  nicknameP.innerText = nickname;

  // Change status
  const statusDivs = header.querySelectorAll("div.status");
  if (active) {
    statusDivs[0].classList.add("active");
    statusDivs[1].classList.remove("active");
  } else {
    statusDivs[1].classList.add("active");
    statusDivs[0].classList.remove("active");
  }

  // Change profile photo:
  const photoImg = header.querySelector("div.profile-img img.profile-photo");
  photoImg.src = profilePhoto;
}

// Send new message:
export function sendNewMessage(event, userID) {
  event.preventDefault();
  const authorID = userID; // User always is author of new message. Getting userID
  const sentAt = getNowTime();

  const chatTextArea = document.getElementById("write-mess");
  let messTxt = chatTextArea.value;
  chatTextArea.value = ""; // Clean textarea

  // If it's empty do nothing:
  if (messTxt === "" || messTxt === "\n" || messTxt === "\r\n") return 0;

  // Add message to interface chat:
  const itsMyMess = true; // TODO: To remove
  addNewMessage(false, itsMyMess, messTxt);

  // Get inboxID:
  const chat = document.getElementById("chat");
  const inboxID = chat.getAttribute("active-inbox");

  // Send new message with data to server:
  console.log(
    `User '${authorID}' send new mess: "${messTxt}" to '${inboxID}' inbox at ${sentAt}.`
  );
  const url = `/chat/send/${inboxID}/${authorID}/${sentAt}/${messTxt}`;
  fetch(url, {
    method: "POST",
  });

  delay(250).then(() => {
    const activeFriendDiv = document.querySelector("div.friend.active");
    loadLastMess(inboxID, activeFriendDiv)
  })
}

// Load chat conversation with friend:
export function loadConversation(friendID, lastMessTime = 0) {
  fetch(`/chat/load/${friendID}`, {
    method: "GET",
  }).then((r) =>
    r.json().then((value) => {
      const inboxID = value.inboxID;
      if (lastMessTime === 0) lastMessTime = getNowTime();
      const messNumber = "";

      fetch(`/chat/load/mess/${inboxID}/${lastMessTime}/${messNumber}`, {
        method: "GET",
      }).then((r) =>
        r.json().then((data) => {
          setInboxOnChat(inboxID);
          loadMessages(data);
        })
      );
    })
  );
}

export function addLoadBar() {
  const loadBar = document.createElement("div");
  loadBar.id = "load-chat";
  const loadCircle = document.createElement("div");
  loadCircle.classList.add("loader");

  loadBar.appendChild(loadCircle);
  chat.insertBefore(loadBar, chat.firstChild);

  delay(850).then(() => {
    removeLoadBar();
    loadOlderMessages();
  });
}

export function loadLastMess(inboxID, divFriend) {
  fetch(`/chat/inbox/${inboxID}`, {
    method: "GET",
  }).then((r) =>
    r.json().then((inboxData) => {
      const lastMess = divFriend.querySelector("p.last-message");
      lastMess.innerText = inboxData.lastMessText;
    })
  );
}
