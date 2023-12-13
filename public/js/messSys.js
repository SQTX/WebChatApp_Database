export function loadChatHeader(nickname, active, profilePhoto) {
  const header = document.getElementById("chat-header");

  // Change name
  const nicknameP = header.querySelector("p.nickname");
  nicknameP.innerText = nickname;

// Change status
  const statusDivs = header.querySelectorAll("div.status");
  if(active) {
    statusDivs[0].classList.add("active");
    statusDivs[1].classList.remove("active");
  }else {
    statusDivs[1].classList.add("active");
    statusDivs[0].classList.remove("active");
  }

  // Change profile photo:
  const photoImg = header.querySelector("div.profile-img img.profile-photo");
  photoImg.src = profilePhoto;
}


export function addNewMessage(amIAuthor, messTxt) {
  const message = document.createElement("p");
  message.innerText = messTxt;


  const messBubble = document.createElement("div");
  messBubble.classList.add("message");
  if(amIAuthor) {
    messBubble.classList.add("user-mess");
  }else {
    messBubble.classList.add("friend-mess");
  }
  messBubble.appendChild(message);


  const chat = document.getElementById("chat");
  chat.appendChild(messBubble);

  // Automatic scroll down:
  messBubble.scrollIntoView();
  messBubble.scrollIntoView({behavior: "smooth"});
};