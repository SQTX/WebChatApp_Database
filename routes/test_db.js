const users = [
  {
    userID: "1",
    firstName: "Marcin",
    lastName: "Grognałer",
    profilePhoto: "friend-1.jpg",
    email: "BiutiBlondi@wp.pl",
    password: "RealMarditPL",
  },

  {
    userID: "2",
    firstName: "Marta",
    lastName: "Skura",
    profilePhoto: "friend-2.jpg",
    email: "taxiNova@onet.com",
    password: "MiroGosc123",
  },

  {
    userID: "3",
    firstName: "Marcinek",
    lastName: "Ściemniacz",
    profilePhoto: "friend-3.jpg",
    email: "mikolajekCzar@gmail.com",
    password: "dupa123",
  },

  {
    userID: "4",
    firstName: "Bob",
    lastName: "Budowaniczy",
    profilePhoto: "",
    email: "mikolajekCzar@gmail.com",
    password: "dupa123",
  },
];

const inbox = [
  {
    authorID: "Marcin",
    messageTxt: "Halo, jak masz na imię?",
    sentAt: "2023-12-25_13:25:12",
  },
  {
    authorID: "Daniel",
    messageTxt: "Siema siema",
    sentAt: "2023-12-25_14:11:03",
  },
  {
    authorID: "Daniel",
    messageTxt: "A co tam potrzebujesz",
    sentAt: "2023-12-25_14:11:33",
  },
  {
    authorID: "Marcin",
    messageTxt: "Aaa nic nic",
    sentAt: "2023-12-26_11:55:12",
  },
  {
    authorID: "Daniel",
    messageTxt: "No to spoxon",
    sentAt: "2023-12-27_07:35:52",
  },
]

module.exports = {users, inbox};