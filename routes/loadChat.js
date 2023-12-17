const { inbox, createClientDB } = require("./test_db");


function sendInboxSize(app) {
  app.get(`/chat/load`, (req, res) => {
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


function findConversation(app, userID) {
  app.get(`/chat/load/${userID}`, (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT "convID"
                      FROM public."conversation"
                      WHERE ("userID" = '1' AND "friendID" = '${userID}')`)
      )
      .then((results) => {
        const conv = results.rows[0];
        const { convID } = conv;
        console.log("Searching conversation:", convID);
        res.send({ convID: convID });
      })
      .catch((e) => console.log(e))
      .finally(() => client.end());
  });
}


function sendMessagesFromConversation(app, convID, messNumber = 10) {
  // if(messNumber)
  messNumber = 3;

  app.get(`/chat/load/mess/${convID}/:lastMessTime/:messNumber?`, (req, res) => {
    let lastMessTime = req.params.lastMessTime;
    if(lastMessTime === "0") lastMessTime = '2023-10-10 20:31:03'

    let messNumber = req.params.messNumber;
    if(messNumber === "0" || messNumber === undefined) messNumber = '5'

    const client = createClientDB();
    client
      .connect()
      .then(() => console.log("Connected successfuly"))
      .then(() =>
        client.query(`SELECT *
                      FROM public."message"
                      WHERE ("inboxID" = '${convID}' AND "sentAt" < '${lastMessTime}')
                      ORDER BY "sentAt" DESC
                      LIMIT ${messNumber}`)
      )
      .then((results) => {
        // console.table(results.rows);
        // console.log(results.rows);
        const data = results.rows;
        res.send(data);
      })
      .catch((e) => console.log(e))
      .finally(() => client.end());
  });
}







const messageNumber = inbox.length;

const firstMessageLoadLimit = 10;




function loadChat(app) {
  findConversation(app);

  const loadLimit =
    messageNumber > firstMessageLoadLimit
      ? firstMessageLoadLimit
      : messageNumber;

  for (let i = 0; i < loadLimit; i++) {
    app.get(`/chat/Marcin/mess${i + 1}`, (req, res) => {
      const messageObj = inbox[i];
      const { authorID, messageTxt, sentAt } = messageObj;

      res.json({ authorID, messageTxt, sentAt });
    });
  }
}

module.exports = { loadChat, sendInboxSize, findConversation, sendMessagesFromConversation };
