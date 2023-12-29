function sendInvite(mailInput) {
  const invEmail = mailInput.value;

  fetch(`/invite/${invEmail}`, {
    method: "POST",
  });

  location.reload();                   // NOTE: Refres app
  console.log("Send inv", invEmail);
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
    sendInvite(mailInput);  // TODO

    mailInput.value = "";
    const addFriendWindow = document.querySelector("section#add-friend");
    addFriendWindow.classList.remove("active");
  })

  mailInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
      sendInvite(mailInput);  // TODO

      mailInput.value = "";
      const addFriendWindow = document.querySelector("section#add-friend");
      addFriendWindow.classList.remove("active");
    }
  })
}
