const {users} = require("./test_db");

function friendsList(app, path) {
  // Send friends number:
  app.get("/friendsNumber", (req, res) => {
    const friendNumber = {"friendsNumber": `${users.length}`};
    res.send(friendNumber);
  })


  // Send all data to frendsList:
  for(const i in users) {
    app.get(`/chat/user${i}`, (req, res) => {
      const user = users[i];
      const {firstName, lastName, profilePhoto} = user;

      res.json({firstName, lastName, profilePhoto});
    })

    const imgDiv = path.join(__dirname, "../public/img");
    app.get(`/chat/user${i}/photo`, (req, res) => {
      let photoFileName = users[i].profilePhoto;

      if(photoFileName === "") {
        photoFileName = "defaultPhoto.jpg";
      };

      res.sendFile(photoFileName, {
        root: imgDiv,
      });
    })
  }
}

module.exports = friendsList;