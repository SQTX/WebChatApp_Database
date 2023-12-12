// Includes:
import {openTerminal} from "./terminal.js";
import {addNewMessage} from "./messSys.js";


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
// Send Button detector:
sendBtn.addEventListener("click", () => {
  let messTxt = chatTextArea.value;
  chatTextArea.value = "";          // Clean textarea
  // If it's empty do nothing:
  if(messTxt === "" || messTxt === "\n" || messTxt === "\r\n") return 0;

  addNewMessage(itsMyMess, messTxt);
});
// Enter in textArea detector:
chatTextArea.addEventListener("keyup", (event) => {
  if(event.key === "Enter") {
    let messTxt = chatTextArea.value;
    chatTextArea.value = "";          // Clean textarea
    // If it's empty do nothing:
    if(messTxt === "" || messTxt === "\n" || messTxt === "\r\n") return 0;
    addNewMessage(itsMyMess, messTxt);
  };
})

// *****************************************************************************

