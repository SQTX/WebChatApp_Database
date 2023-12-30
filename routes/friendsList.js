const { createClientDB } = require("./databaseController");
const printLog = require('./logSystem');

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
// Send all data to frendsList:
function loadPathForUsers(app, path, userNumber) {
  for (let i = 0; i < userNumber; i++) {
    app.get(`/chat/user${i}`, (req, res) => {
      const client = createClientDB();
      client
        .connect()
        .then(() => console.log("Connected successfuly"))
        .then(() => client.query(`SELECT * FROM public."user"`))
        .then((results) => {
          const friend = results.rows[i + 1];
          const { userID, firstname, lastname, profilePhoto } = friend;
          printLog(`Load conversation with ${firstname} ${lastname} userID '${userID}' (profilePhoto: ${profilePhoto})`);
          res.json({ userID, firstname, lastname, profilePhoto });
        })
        .catch((e) => console.log(e))
        .finally(() => client.end());
    });

    const imgDiv = path.join(__dirname, "../public/img");
    app.get(`/chat/user${i}/photo`, (req, res) => {
      const client = createClientDB();
      client
        .connect()
        .then(() => console.log("Connected successfuly"))
        .then(() => client.query(`SELECT * FROM public."user"`))
        .then((results) => {
          const friend = results.rows[i + 1];
          const profilePhoto = friend.profilePhoto;
          printLog(`Photo: ${profilePhoto}`);
          if (profilePhoto === "") profilePhoto = "defaultPhoto.jpg"

          printLog(`${profilePhoto}`);
          res.sendFile(profilePhoto, {
            root: imgDiv,
          });
        })
        .catch((e) => console.log(e))
        .finally(() => client.end());
    });
  }
}

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
// TODO: Make this function more readable
function friendsList(app, path) {
  // Send friends number:
  app.get("/friendsNumber", (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT COUNT("email")
                      FROM public."user"`)
      )
      .then((results) => {
        let friendNumber = parseInt(results.rows[0].count);
        friendNumber -= 1; // One of users in DB is not a friend (he's truly user)
        const number = friendNumber.toString();
        // printLog(`Friend number: '${number}'`);
        loadPathForUsers(app, path, number);
        res.send(number);
      })
      .catch((e) => console.log(e))
      .finally(() => client.end());
  });
}

// =====================================================================================================
// Export:
module.exports = friendsList;