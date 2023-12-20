const {inbox} = require("./test_db");

const messageNumber = inbox.length;

const firstMessageLoadLimit = 10;

function inboxSize(app) {
  app.get(`/chat/Marcin/size`, (req, res) => {
    const inboxSize = inbox.length;
    res.send({"inboxSize": inboxSize});
  })
}

function loadChat(app) {
  const loadLimit = (messageNumber > firstMessageLoadLimit) ? firstMessageLoadLimit : messageNumber;

  for(let i = 0; i < loadLimit; i++) {
    app.get(`/chat/Marcin/mess${i+1}`, (req, res) => {
      const messageObj = inbox[i];
      const {authorID, messageTxt, sentAt} = messageObj;

      res.json({authorID, messageTxt, sentAt});
    })
  }
}

module.exports = {loadChat, inboxSize};