export function clearChat() {
  const chat = document.getElementById("chat");
  const messages = chat.querySelectorAll("div.message");
  messages.forEach(message => {
    message.remove();
  });
}


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


export function addNewMessage(loadMode = false, amIAuthor, messTxt, isLast = false, sentAt = 0) {
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
  if(isLast) {
    // Delete previous last element:
    const prevLastMess = document.getElementById("last-loaded");
    if(prevLastMess !== null) {
      prevLastMess.removeAttribute('id');
      prevLastMess.removeAttribute('sentAt');
    }

    // Add new last element:
    messBubble.id = "last-loaded";
    messBubble.setAttribute("sentAt", sentAt);
  }
  messBubble.appendChild(message);

  
  if(loadMode) chat.insertBefore(messBubble, chat.firstChild);
  else chat.appendChild(messBubble);

  // Automatic scroll down:
  messBubble.scrollIntoView();
  messBubble.scrollIntoView({ behavior: "smooth" });
}


function loadMessages(data) {
  console.log(data);
  // data.reverse();
  data.forEach((message, index) => {
    const {authorID, sentAt, messTxt} = message;
    console.log("Wiadomość:", authorID, sentAt, messTxt);

    const amIAuthor = (authorID === 1) ? true : false;
    if(index === (data.length - 1)) addNewMessage(true, amIAuthor, messTxt, true, sentAt);  // Last loaded mess
    else addNewMessage(true, amIAuthor, messTxt);
  });

}

export function loadConversation(friendID, lastMessTime = 0) {
  fetch(`/chat/load/${friendID}`, {
    method: "GET",
  }).then((r) =>
    r.json().then((value) => {
      const inboxID = value.inboxID;
      // const lastMessTime = ;
      const messNumber = "";

      fetch(`/chat/load/mess/${inboxID}/${lastMessTime}/${messNumber}`, {
        method: "GET",
      }).then((r) => r.json().then((data) => {
        // setInboxID();  TODO
        loadMessages(data);
      }));
    })
  );
}

