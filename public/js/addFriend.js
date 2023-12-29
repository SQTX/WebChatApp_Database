function sendInvit(mailInput) {
  const txt = mailInput.value;
  console.log("Send inv", txt);
  //TODO
}


export function openAddFriendWindow() {
  const addFriendWindow = document.querySelector("section#add-friend");
  addFriendWindow.classList.add("active");
  const menuBar = document.querySelector("menu");
  menuBar.classList.remove("active");

  const addFriendWinExitBtn = document.getElementById("af-windows-exit");
  addFriendWinExitBtn.addEventListener("click", () => {
    const addFriendWindow = document.querySelector("section#add-friend");
    addFriendWindow.classList.remove("active");
  })


  const addFriendBtn = document.getElementById("send-invit");
  const mailInput = document.getElementById("email-input");

  addFriendBtn.addEventListener('click', () => {
    sendInvit(mailInput);  // TODO

    mailInput.value = "";
    const addFriendWindow = document.querySelector("section#add-friend");
    addFriendWindow.classList.remove("active");
  })

  mailInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
      sendInvit(mailInput);  // TODO

      mailInput.value = "";
      const addFriendWindow = document.querySelector("section#add-friend");
      addFriendWindow.classList.remove("active");
    }
  })
}
