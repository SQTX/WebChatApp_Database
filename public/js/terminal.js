import { getNowTime } from "./time.js";

export function openTerminal() {
  const terminalWindow = document.getElementById("terminal");
  terminalWindow.classList.add("active");
  const menuBar = document.querySelector("menu");
  menuBar.classList.remove("active");

  const terminalWinClearBtn = document.getElementById("terminal-clear");
  terminalWinClearBtn.addEventListener("click", () => {
    const logs = document.querySelectorAll("p.log");
    logs.forEach((log) => log.remove());
  })

  const terminalWinExitBtn = document.getElementById("terminal-exit");
  terminalWinExitBtn.addEventListener("click", () => {
    const terminalWindow = document.getElementById("terminal");
    terminalWindow.classList.remove("active");
  })
}

// getTimeNow

export function printLog(log) {
  const time = getNowTime();
  // Create log:
  const logP = document.createElement('p');
  logP.classList.add("log");
  let logMess = `>(${time}): ${log}`;
  logP.innerText = logMess;

  const logArea = document.getElementById("log-area");
  const emptyLogCur = document.querySelector("p.empty-log");

  logArea.insertBefore(logP, emptyLogCur);

  // Automatic scroll down:
  emptyLogCur.scrollIntoView();
  emptyLogCur.scrollIntoView({ behavior: "smooth" });
}
