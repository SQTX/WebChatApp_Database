// Package:
const express = require('express');   // Express framework
const path = require('path');         // Path module
// Files
const friendsList = require('./routes/friendsList');
const { sendInboxSize, loadAllConversations } = require('./routes/loadChat');
const sendMessage = require('./routes/sendMessage');


// =====================================================================================================
// Set up:
const app = express();                                     // Create new express application
app.listen(3000, () => console.log("Serwer is online"));   // Open port 3000 on localhost

const staticPath = path.join(__dirname, "/public");        // Set static path to frontend files
app.use(express.static(staticPath));                       // Use it


// =====================================================================================================
// Call backend functions:
friendsList(app, path);           // Load friends list
sendInboxSize(app);               // Get size of user inbox
loadAllConversations(app);        // Load path for any conversation

sendMessage(app);                 // Load path for sending new messages