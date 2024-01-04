// Package:
const express = require('express');   // Express framework
const path = require('path');         // Path module
// Files:
const { friendsList, getConversation, getInbox } = require('./routes/friendsList');
const { sendInboxSize, loadAllConversations } = require('./routes/loadChat');
const inviteNewFriend = require("./routes/inviteFriend");
const sendMessage = require('./routes/sendMessage');
const printLog = require('./routes/logSystem');
const fs = require('fs');
const https = require('https');


// =====================================================================================================
// Set up:
const app = express();                                     // Create new express application


const privateKey = fs.readFileSync('keys\\client_key.pem', 'utf8');     // Get a private key
const certificate = fs.readFileSync('keys\\client_cert.pem', 'utf8');   // Get a certificate
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);   // Create HTTPS server

httpsServer.listen(3000, () => console.log("Server is online"));   // Open port 3000 on localhost

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