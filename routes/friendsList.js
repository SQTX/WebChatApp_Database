const users = [
    {
      "userID": "1",
      "firstName": "Marcin",
      "lastName": "Grognałer",
      "profilePhoto": "friend-1.jpg",
      "email": "BiutiBlondi@wp.pl",
      "password": "RealMarditPL",
    },

    {
      "userID": "2",
      "firstName": "Marta",
      "lastName": "Skura",
      "profilePhoto": "friend-2.jpg",
      "email": "taxiNova@onet.com",
      "password": "MiroGosc123",
    },

    {
      "userID": "3",
      "firstName": "Marcinek",
      "lastName": "Ściemniacz",
      "profilePhoto": "friend-3.jpg",
      "email": "mikolajekCzar@gmail.com",
      "password": "dupa123",
    },

    {
      "userID": "4",
      "firstName": "Bob",
      "lastName": "Budowaniczy",
      "profilePhoto": "",
      "email": "mikolajekCzar@gmail.com",
      "password": "dupa123",
    },
  ]

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