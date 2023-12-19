export function openTerminal() {
  const terminalWindow = document.querySelector("section#terminal");
  terminalWindow.classList.add("active");
  const menuBar = document.querySelector("menu");
  menuBar.classList.remove("active");


  const terminalWinExitBtn = document.querySelector("button.terminal-exit");
  terminalWinExitBtn.addEventListener("click", () => {
    const terminalWindow = document.querySelector("section#terminal");
    terminalWindow.classList.remove("active");
  })
}
