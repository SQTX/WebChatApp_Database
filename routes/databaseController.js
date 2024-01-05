// Package:
const {Client} = require('pg');
const fs = require("fs");
const path = require("path");    // PostgresSQL

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
/**
 * Function to create new Client object
 * @returns {Client} - is a new Client object (needed to single query)
 */

const caPath = path.join(__dirname, '..', 'keys', 'ca.crt');

function createClientDB() {
  const client = new Client({
    user: "postgres",
    password: "sqtx7177",
    host: "localhost",
    port: 5432,
    database: "WebChatApp_DB",
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(caPath).toString(),
    }
  })

  return client;
}

// =====================================================================================================
// Export:
module.exports = {createClientDB};

