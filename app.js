// Package:
const express = require('express');   // Express framework
const path = require('path');         // Path module
// Files:
const { friendsList, getConversation, getInbox } = require('./routes/friendsList');
const { sendInboxSize, loadAllConversations } = require('./routes/loadChat');
const inviteNewFriend = require("./routes/inviteFriend");
const sendMessage = require('./routes/sendMessage');
const printLog = require('./routes/logSystem');


// =====================================================================================================
// Set up:
const app = express();                                     // Create new express application
app.listen(3000, () => printLog("Serwer is online now!"));   // Open port 3000 on localhost

const staticPath = path.join(__dirname, "/public");        // Set static path to frontend files
app.use(express.static(staticPath));                       // Use it


// =====================================================================================================
// Call backend functions:
printLog("Load initial functions");
getConversation(app);
getInbox(app);
friendsList(app, path);           // Load friends list
sendInboxSize(app);               // Get size of user inbox
loadAllConversations(app);        // Load path for any conversation


printLog("Load other functions");
inviteNewFriend(app);
sendMessage(app);                 // Load path for sending new messages