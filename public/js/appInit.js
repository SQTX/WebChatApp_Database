// TODO: Make clean this file
const userID = 1;
// Connection with backend
const friendsList = document.getElementById("friends-list");

import { loadLastMess } from "./messSys.js";

function addFriendToList(data) {
  const friendID = data.userID;
  let nickname = data.firstname + " " + data.lastname;

  const lastMess = "Lorem ipsum dolor sit amet."; // TODO
  const profilePhoto =
    data.profilePhoto === "" ? "defaultPhoto.jpg" : data.profilePhoto;

  const divFriend = createFriendDiv(nickname, lastMess, profilePhoto);
  divFriend.setAttribute("friendID", friendID);

  fetch(`/chat/conv/${userID}/${friendID}`, {
    method: "GET",
  }).then((r) =>
    r.json().then((convData) => {
      divFriend.setAttribute("convID", convData.convID);
      divFriend.setAttribute("inboxID", convData.inboxID);

      loadLastMess(convData.inboxID, divFriend);
    })
  );

  // TODO: Sprawdzenie czy friendID jest w bazie danych zanjomych konkretnej osoby
  friendsList.appendChild(divFriend);

  console.log("Load new friend:", nickname);
}

function createFriendDiv(nickname, lastMess, profilePhoto) {
  const nicknameP = document.createElement("p");
  nicknameP.classList.add("nickname");
  nicknameP.innerText = nickname;

  const lastMessP = document.createElement("p");
  lastMessP.classList.add("last-message");
  lastMessP.innerText = lastMess;

  const spanFriendTxt = document.createElement("span");
  spanFriendTxt.classList.add("friend-text");

  spanFriendTxt.appendChild(nicknameP);
  spanFriendTxt.appendChild(lastMessP);

  const imgElement = document.createElement("img");
  imgElement.classList.add("profile-photo");
  imgElement.setAttribute("src", `/img/${profilePhoto}`);
  imgElement.setAttribute("alt", "");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("profile-img");

  imgDiv.appendChild(imgElement);

  const divFriend = document.createElement("div");
  divFriend.classList.add("friend");

  divFriend.appendChild(spanFriendTxt);
  divFriend.appendChild(imgDiv);
  return divFriend;
}

function getUserFromServer() {
  console.log("Load friend list");

  fetch("/friendsNumber", {
    method: "GET",
  }).then((r) =>
    r.json().then((number) => {
      const friendsCounter = number || 0;

      for (let i = 0; i < friendsCounter; i++) {
        fetch(`/chat/user${i}`, {
          method: "GET",
        }).then((r) => r.json().then((data) => addFriendToList(data)));
      }
    })
  );
}

getUserFromServer();

// =====================================================================================================
import { loadChatHeader } from "./messSys.js";
loadChatHeader("Szalony Marcinek", true, "img/friend-3.jpg");

async function printMessages(chat, data, userID) {
  let message = document.createElement("p");
  message.innerText = data.messageTxt;

  let messBubble = document.createElement("div");
  messBubble.classList.add("message");
  const authorID = data.authorID;
  if (userID === authorID) {
    messBubble.classList.add("user-mess");
  } else {
    messBubble.classList.add("friend-mess");
  }

  messBubble.appendChild(message);
  await chat.appendChild(messBubble);

  // Automatic scroll down:
  messBubble.scrollIntoView();
  messBubble.scrollIntoView({ behavior: "smooth" });
}

// const maxLimit = 5;
// const userID = "Daniel";
// const chat = document.getElementById("chat");

// async function loadMessages(maxLimit) {
//   for (let i = 0; i < maxLimit; i++) {
//     await fetch(`/chat/Marcin/mess${i + 1}`, {
//       method: "GET",
//     }).then((r) => r.json().then((data) => printMessages(chat, data, userID)));
//   }
// }

// async function loadChat() {
//   await fetch(`/chat/Marcin/size`, {
//     method: "GET",
//   }).then((r) => r.json().then((data) => loadMessages(data.inboxSize)));
// }

// loadChat();
