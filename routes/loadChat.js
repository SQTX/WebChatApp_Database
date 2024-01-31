const { createClientDB } = require("./databaseController");
const printLog = require('./logSystem');

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
/**
 * Load inbox paths for any user's conversation.
 */
function loadConversationPath(app, userID) {
  app.get(`/chat/load/${userID}`, (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => printLog("Connected with database successfuly [3]", 'database'))
      .then(() =>
        client.query(`SELECT "inboxID"
                      FROM public."conversation"
                      WHERE ("userID" = '1' AND "friendID" = '${userID}')`)
      )
      .then((results) => {
        const inbox = results.rows[0];
        const { inboxID } = inbox;
        printLog(`Searching inbox with [friend ID] '${inboxID}' ID`, 'debug');
        loadMessagesFromConversation(app, inboxID);
        res.send({ inboxID: inboxID });
        printLog(`Conversation with [friend ID] '${inboxID}' has loaded`, 'debug');
      })
      .catch((e) => printLog("Cannot connected with database [3]: ", 'error', new Error(e)))
      .finally(() => client.end());
  });
}

/**
 * Load all messages from inbox.
 */
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
        .then(() => printLog("Connected with database successfuly [4]", 'database'))
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
        .catch((e) => printLog("Cannot connected with database [4]: ", 'error', new Error(e)))
        .finally(() => client.end());
    }
  );
}

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
/**
 * Return inboxs numbers
 */
function sendInboxSize(app) {
  app.get(`/chat/load/conversation`, (req, res) => {
    const client = createClientDB();
    client
      .connect()
      .then(() => printLog("Connected with database successfuly [5]", 'database'))
      .then(() =>
        client.query(`SELECT COUNT("convID")
                      FROM public."conversation";`)
      )
      .then((results) => {
        const count = Number(results.rows[0].count);
        printLog(`Conversation count is ${count}`, 'debug');
        res.send({ count: count });
      })
      .catch((e) => printLog("Cannot connected with database [5]: ", 'error', new Error(e)))
      .finally(() => client.end());
  });
}

/**
 * Function to load all path form caht with any friend.
 */
function loadAllConversations(app) {
  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected with database successfuly [6]", 'database'))
    .then(() =>
      client.query(`SELECT "friendID"
                    FROM public."conversation";`)
    )
    .then((results) => {
      const data = results.rows;
      let friendsID = [];
      data.forEach((idNum) => friendsID.push(idNum));

      const conversationNumber = friendsID.length;

      for (let i = 0; i < conversationNumber; i++) {
        const { friendID } = friendsID[i];
        loadConversationPath(app, friendID);
        printLog(`Conversation with [friend ID] '${friendID}' has loaded.`, 'debug');
      }
    })
    .catch((e) => printLog("Cannot connected with database [6]: ", 'error', new Error(e)))
    .finally(() => client.end());
}

// =====================================================================================================
// Export:
module.exports = { sendInboxSize, loadAllConversations };