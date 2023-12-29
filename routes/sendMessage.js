const { createClientDB } = require("./databaseController");

// =====================================================================================================
// PRIVATE:
// =====================================================================================================
/**
 * Add new message and its data into message table in database.
 */
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

/**
 * Update information about last message in inbox table.
 */
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

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
/**
 * Function gets data from URL parametrs and call function to add new data in DB and
 * update data in inbox table.
 */
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

// =====================================================================================================
// Export:
module.exports = sendMessage;