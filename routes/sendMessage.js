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
    .then(() => printLog("Connected successfuly", 'db'))
    .then(() =>
      client.query(`INSERT INTO public."message"("inboxID", "authorID", "sentAt", "messTxt")
                    VALUES ('${inboxID}','${authorID}','${sentAt}','${messTxt}');`)
    )
    .then(() => printLog("Add new message to database."))
    .catch((e) => printLog(e, 'err'))
    .finally(() => client.end());
}

/**
 * parameterized
 */
/*function addNewMessageToDB(inboxID, authorID, sentAt, messTxt) {
  const pgp = require('pg-promise')();
  const client = pgp(createClientDB());
  client.none('INSERT INTO public."message"("inboxID", "authorID", "sentAt", "messTxt") VALUES ($1, $2, $3, $4)',
      [inboxID, authorID, sentAt, messTxt])
      .then(() => console.log("Add new message to database."))
      .catch(error => console.error(error))
      .finally(() => pgp.end());
}*/

/**
 * Update information about last message in inbox table.
 */
function updateInboxData(inboxID, authorID, sentAt, messTxt) {
  const client = createClientDB();
  client
    .connect()
    .then(() => printLog("Connected successfuly", 'db'))
    .then(() =>
      client.query(`UPDATE public."inbox"
                    SET "lastSentAuthor"='${authorID}', "lastMessTime"='${sentAt}', "lastMessText"='${messTxt}'
	                  WHERE "inboxID"='${inboxID}';`)
    )
    .then(() => printLog(`Update data in inbox: ${inboxID}`))
    .catch((e) => printLog(e, 'err'))
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