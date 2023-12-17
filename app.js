const express = require('express');
const path = require('path');
const friendsList = require('./routes/friendsList');
const {loadChat, inboxSize} = require('./routes/loadChat');
const sendMessage = require('./routes/sendMessage');
// Create app:
const app = express();
// Open localhost port:
app.listen(3000, () => {
  console.log("Serwer is online");
});

const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

friendsList(app, path);
inboxSize(app);
loadChat(app);

sendMessage(app);
