const { createClientDB } = require("./test_db");

function addNewMessageToDB(inboxID, authorID, sentAt, messTxt) {
  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
    .then(() =>
      client.query(`INSERT INTO public."message"("inboxID", "authorID", "sentAt", "messTxt")
                    VALUES ('${inboxID}','${authorID}','${sentAt}','${messTxt}');`)
    )
    .then(() => console.log("Add new message to database."))
    .catch((e) => console.log(e))
    .finally(() => client.end());
}

function updateInboxData(inboxID, authorID, sentAt, messTxt) {
  const client = createClientDB();
  client
    .connect()
    .then(() => console.log("Connected successfuly"))
    .then(() =>
      client.query(`UPDATE public."inbox"
                    SET "lastSentAuthor"='${authorID}', "lastMessTime"='${sentAt}', "lastMessText"='${messTxt}'
	                  WHERE "inboxID"='${inboxID}';`)
    )
    .then(() => console.log("Update data in inbox:", inboxID))
    .catch((e) => console.log(e))
    .finally(() => client.end());
}


function sendMessage(app) {
  app.post("/chat/send/:inboxID/:authorID/:sentAt/:messTxt", (req, res) => {
    const inboxID = req.params.inboxID;
    const authorID = req.params.authorID;
    const sentAt = req.params.sentAt;
    const messTxt = req.params.messTxt;
    console.log(inboxID, authorID, sentAt, messTxt);

    addNewMessageToDB(inboxID, authorID, sentAt, messTxt);
    updateInboxData(inboxID, authorID, sentAt, messTxt);
  });
}

module.exports = sendMessage;
