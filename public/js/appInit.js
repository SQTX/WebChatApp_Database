// Connection with backend

// const activeUserNickname = document.querySelector('.chat-header>p.nickname');

// function fillUserData(data) {
//   let nickname = data.firstName;
//   nickname += " " + data.lastName;
//   activeUserNickname.innerText = nickname;
// }

const friendsList = document.getElementById("friends-list");
function addFriendToList(data) {
  let nickname = data.firstName;
  nickname += " " + data.lastName;

  const lastMess = "Lorem ipsum dolor sit amet.";
  const profilePhoto = (data.profilePhoto === "") ? "defaultPhoto.jpg": data.profilePhoto;

  const divFriend = createFriendDiv(nickname, lastMess, profilePhoto);
  friendsList.appendChild(divFriend);
  console.log("Load new friend");
}

function createFriendDiv(nickname, lastMess, profilePhoto) {
  const nicknameP = document.createElement('p');
  nicknameP.classList.add('nickname');
  nicknameP.innerText = nickname;

  const lastMessP = document.createElement('p');
  lastMessP.classList.add('last-message');
  lastMessP.innerText = lastMess;

  const spanFriendTxt = document.createElement('span');
  spanFriendTxt.classList.add('friend-text');

  spanFriendTxt.appendChild(nicknameP);
  spanFriendTxt.appendChild(lastMessP);


  const imgElement = document.createElement('img');
  imgElement.classList.add('profile-photo');
  imgElement.setAttribute('src', `/img/${profilePhoto}`);
  imgElement.setAttribute('alt', "");

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('profile-img');

  imgDiv.appendChild(imgElement);

  const divFriend = document.createElement('div');
  divFriend.classList.add('friend');

  divFriend.appendChild(spanFriendTxt);
  divFriend.appendChild(imgDiv);
  return divFriend;
}

function getUserFromServer() {
  fetch('/friendsNumber', {
        method: 'GET',
    })
    .then(r => r.json().then(number => {
      const friendsCounter = number.friendsNumber || 0;

      for(let i = 0; i < friendsCounter; i++) {
          fetch(`/chat/user${i}`, {
              method: 'GET',
          })
          .then(r => r.json().then(data=>addFriendToList(data)))
        }
    }))
}

getUserFromServer();