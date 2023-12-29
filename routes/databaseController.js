// Package:
const {Client} = require('pg');    // PostgresSQL

// =====================================================================================================
// PUBLIC:
// =====================================================================================================
/**
 * Function to create new Client object
 * @returns {Client} - is a new Client object (needed to single query)
 */
function createClientDB() {
  const client = new Client({
    user: "postgres",
    password: "sqtx7177",
    host: "localhost",
    port: 5432,
    database: "WebChatApp_DB"
  })

  return client;
}

// =====================================================================================================
// Export:
module.exports = {createClientDB};