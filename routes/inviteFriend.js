const path = require('path');         // Path module
const { createClientDB } = require("./databaseController");
const friendsList = require('./friendsList');
const printLog = require('./logSystem');

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
function addUserToFriendList(userData) {
  const { firstname, lastname, profilePhoto, email, password } = userData;

  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected with database successfuly [7]", 'database'))
    .then(() =>
      client.query(`INSERT INTO public."user"(
	                    "firstname", "lastname", "profilePhoto", "email", "password")
	                    VALUES ('${firstname}', '${lastname}', '${profilePhoto}', '${email}', '${password}');`)
    )
    .then(() =>
      client.query(`SELECT "userID" FROM public."user"
                      WHERE ("email" = '${email}');`)
    )
    .then((results) => {
      const data = results.rows[0];
      const { userID } = data;
      createInbox(userID);
    })
    .catch((e) => printLog("Cannot connected with database [7]: ", 'error', new Error(e)))
    .finally(() => client.end());
}

function createInbox(userID) {
  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected with database successfuly [8]", 'database'))
    .then(() =>
      client.query(`INSERT INTO public."inbox"("lastSentAuthor", "lastMessTime", "lastMessText")
	                    VALUES (null, null, null);`)
    )
    .then(() =>
      client.query(`SELECT *
                      FROM public."inbox"
                      ORDER BY "inboxID" DESC LIMIT 1;`)
    )
    .then((results) => {
      const { inboxID } = results.rows[0];
      createConversation(userID, inboxID);
    })
    .catch((e) => printLog("Cannot connected with database [8]: ", 'error', new Error(e)))
    .finally(() => client.end());
}

function createConversation(userID, inboxID) {
  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected with database successfuly [9]", 'database'))
    .then(() =>
      client.query(`INSERT INTO public."conversation"("userID", "friendID", "inboxID")
	                  VALUES ('1', '${userID}', '${inboxID}');`)
    )
    .then(() => printLog("Added new friend ('${userID}') to friend list", 'database'))
    .catch((e) => printLog("Cannot connected with database [9]: ", 'error', new Error(e)))
    .finally(() => client.end());
}
// =====================================================================================================
// PUBLIC:
// =====================================================================================================
function inviteNewFriend(app) {
  app.post("/invite/:email", (req, res) => {
    const invEmail = req.params.email;
    printLog(`Invite firiend with "${invEmail}" address email`, 'debug');

    // mail filter() TODO

    const client = createClientDB();
    client
      .connect()
      .then(() => printLog("Connected with database successfuly [10]", 'database'))
      .then(() =>
        client.query(`SELECT *
                      FROM public."person"
                      WHERE ("email" = '${invEmail}');`)
      )
      .then((results) => {
        const data = results.rows[0];
        addUserToFriendList(data);
      })
      .then(() => friendsList(app, path))
      .catch((e) => printLog("Cannot connected with database [10]: ", 'error', new Error(e)))
      .finally(() => client.end());
  });
}

module.exports = inviteNewFriend;