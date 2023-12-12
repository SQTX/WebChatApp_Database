export function addNewMessage(amIAuthor, messTxt) {
  let message = document.createElement("p");
  message.innerText = messTxt;


  let messBubble = document.createElement("div");
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