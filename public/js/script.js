// Includes:
import {openTerminal} from "./terminal.js";
// import {addNewMessage} from "./messSys.js";


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
