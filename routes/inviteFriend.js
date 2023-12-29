const { createClientDB } = require("./databaseController");
const friendsList = require('./friendsList');
const path = require('path');         // Path module

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
function addUserToFriendList(userData) {
  const { firstname, lastname, profilePhoto, email, password } = userData;
  // console.log(firstname, lastname, profilePhoto, email, password);

  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
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
      console.log("Lujec:", userID);
      createInbox(userID);
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
}

function createInbox(userID) {
  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
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
    .catch((e) => console.log(e))
    .finally(() => client.end());
}

function createConversation(userID, inboxID) {
  console.log("User:", userID);
  console.log("Inbox:", inboxID);

  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
    .then(() =>
      client.query(`INSERT INTO public."conversation"("userID", "friendID", "inboxID")
	                  VALUES ('1', '${userID}', '${inboxID}');`)
    )
    .then(() => console.log("Added new friend to friend list"))
    .catch((e) => console.log(e))
    .finally(() => client.end());
}
// =====================================================================================================
// PUBLIC:
// =====================================================================================================
function inviteNewFriend(app) {
  app.post("/invite/:email", (req, res) => {
    const invEmail = req.params.email;
    console.log(`Invite firiend with "${invEmail}" address email`);

    // mail filter() TODO

    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT *
                      FROM public."person"
                      WHERE ("email" = '${invEmail}');`)
      )
      .then((results) => {
        const data = results.rows[0];
        console.log(data);
        addUserToFriendList(data);
      })
      .then(() => friendsList(app, path))
      .catch((e) => console.log(e))
      .finally(() => client.end());
    // createFriendInbox()
    // createConversation()
  });
}

module.exports = inviteNewFriend;
