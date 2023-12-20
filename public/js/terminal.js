export function openTerminal() {
  const terminalWindow = document.querySelector("section#terminal");
  terminalWindow.classList.add("active");
  const menuBar = document.querySelector("menu");
  menuBar.classList.remove("active");

  const terminalWinClearBtn = document.getElementById("terminal-clear");
  terminalWinClearBtn.addEventListener("click", () => {
    const logs = document.querySelectorAll("p.log");
    logs.forEach((log) => log.remove())
  })

  const terminalWinExitBtn = document.getElementById("terminal-exit");
  terminalWinExitBtn.addEventListener("click", () => {
    const terminalWindow = document.querySelector("section#terminal");
    terminalWindow.classList.remove("active");
  })
}
