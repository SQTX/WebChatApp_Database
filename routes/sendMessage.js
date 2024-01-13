const { createClientDB } = require("./databaseController");
const printLog = require('./logSystem');

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
    .then(() => printLog("Connected with database successfuly [1]", 'database'))
    .then(() =>
      client.query(`INSERT INTO public."message"("inboxID", "authorID", "sentAt", "messTxt")
                    VALUES ('${inboxID}','${authorID}','${sentAt}','${messTxt}');`)
    )
    .then(() => printLog("Add new message to database.", 'database'))
    .catch((e) => printLog("Cannot connected with database [1]: ", 'error', new Error(e)))
    .finally(() => client.end());
}

/**
 * Update information about last message in inbox table.
 */
function updateInboxData(inboxID, authorID, sentAt, messTxt) {
  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected with database successfuly [2]", 'database'))
    .then(() =>
      client.query(`UPDATE public."inbox"
                    SET "lastSentAuthor"='${authorID}', "lastMessTime"='${sentAt}', "lastMessText"='${messTxt}'
	                  WHERE "inboxID"='${inboxID}';`)
    )
    .then(() => printLog(`Data in inbox has updated: ${inboxID}`, 'database'))
    .catch((e) => printLog("Cannot connected with database [2]: ", 'error', new Error(e)))
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

    addNewMessageToDB(inboxID, authorID, sentAt, messTxt);
    updateInboxData(inboxID, authorID, sentAt, messTxt);
  });
}

// =====================================================================================================
// Export:
module.exports = sendMessage;