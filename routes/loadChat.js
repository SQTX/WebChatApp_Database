const { createClientDB } = require("./test_db");


function sendInboxSize(app) {
  app.get(`/chat/load/conversation`, (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT COUNT("convID")
                      FROM public."conversation";`)
      )
      .then((results) => {
        const count = Number(results.rows[0].count);
        console.log("Conversation count:", count);
        res.send({ count: count });
      })
      .catch((e) => console.log(e))
      .finally(() => client.end());
  });
}


function loadAllConversations(app) {
  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
    .then(() =>
      client.query(`SELECT "friendID"
                    FROM public."conversation";`)
    )
    .then((results) => {
      const data = results.rows;
      let friendsID = [];
      data.forEach((element) => friendsID.push(element));

      const conversationNumber = friendsID.length;

      for (let i = 0; i < conversationNumber; i++) {
        const { friendID } = friendsID[i];
        loadConversationPath(app, friendID);
        console.log(`${i + 1}. Conversation for`, friendID, "is loaded.");
      }
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
}

function loadConversationPath(app, userID) {
  app.get(`/chat/load/${userID}`, (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT "inboxID"
                      FROM public."conversation"
                      WHERE ("userID" = '1' AND "friendID" = '${userID}')`)
      )
      .then((results) => {
        const inbox = results.rows[0];
        const { inboxID } = inbox;
        console.log("Searching inbox:", inboxID);
        loadMessagesFromConversation(app, inboxID);
        res.send({ inboxID: inboxID });
      })
      .catch((e) => console.log(e))
      .finally(() => client.end());
  });
}

function loadMessagesFromConversation(app, inboxID, messNumber = 10) {
  app.get(
    `/chat/load/mess/${inboxID}/:lastMessTime/:messNumber?`,
    (req, res) => {
      let lastMessTime = req.params.lastMessTime;
      if (lastMessTime === "0") lastMessTime = "2023-10-10 20:31:03";

      let messNumber = req.params.messNumber;
      if (messNumber === "0" || messNumber === undefined) messNumber = "10";

      const client = createClientDB();
      client
        .connect()
        .then(() => console.log("Connected successfuly"))
        .then(() =>
          client.query(`SELECT *
                      FROM public."message"
                      WHERE ("inboxID" = '${inboxID}' AND "sentAt" < '${lastMessTime}')
                      ORDER BY "sentAt" DESC
                      LIMIT ${messNumber}`)
        )
        .then((results) => {
          const data = results.rows;
          res.send(data);
        })
        .catch((e) => console.log(e))
        .finally(() => client.end());
    }
  );
}


module.exports = { loadAllConversations, sendInboxSize };