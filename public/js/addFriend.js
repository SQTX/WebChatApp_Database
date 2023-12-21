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
}
