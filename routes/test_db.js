// const inbox = [
//   {
//     authorID: "Marcin",
//     messageTxt: "Halo, jak masz na imię?",
//     sentAt: "2023-12-25_13:25:12",
//   },
//   {
//     authorID: "Daniel",
//     messageTxt: "Siema siema",
//     sentAt: "2023-12-25_14:11:03",
//   },
//   {
//     authorID: "Daniel",
//     messageTxt: "A co tam potrzebujesz",
//     sentAt: "2023-12-25_14:11:33",
//   },
//   {
//     authorID: "Marcin",
//     messageTxt: "Aaa nic nic",
//     sentAt: "2023-12-26_11:55:12",
//   },
//   {
//     authorID: "Daniel",
//     messageTxt: "No to spoxon",
//     sentAt: "2023-12-27_07:35:52",
//   },
//   {
//     authorID: "Daniel",
//     messageTxt: "Xddd",
//     sentAt: "2023-12-27_07:36:52",
//   },
// ]


// const foo = "'S'";
// const foo = "'S' OR age = 5";

// const addUserQuery = {
//   text: `INSERT INTO public."user"(firstname, lastname, "profilePhoto", email, password)
//   VALUES ($1, $2, $3, $4, $5)`,
// //   values: ['Marcinek', 'Ściemniacz', 'friend-3.jpg', 'mikolajekCzar@gmail.com', 'dupa123'],
//   values: ['Marta', 'Skura', 'friend-2.jpg', 'taxiNova@onet.com', 'MiroGosc123'],
// }


// client.connect()
// .then(() => console.log("Connected successfuly"))
// .then(() => client.query(`SELECT name FROM test WHERE name = ${foo}`))
// .then(() => client.query(`SELECT * FROM public."user"`))
// .then(() => client.query(`SELECT * FROM public."user" WHERE "userID" = 3`))
// .then(() => client.query(`SELECT * FROM public."inbox"`))
// .then(() => client.query(`SELECT * FROM public."conversation"`))
// .then(() => client.query(`SELECT * FROM public."message"`))
// .then(results => console.table(results.rows))
// .then(() => client.query(addUserQuery))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end())



// **********************************************************
// -- INSERT INTO public."user"(firstname, lastname, "profilePhoto", email, password)
// -- VALUES 		('Grzegorz', 'Braun', 'gasnicaPolski.jpg', 'konf@wp.pl', 'haslo33');

// -- GRANT ALL PRIVILEGES ON TABLE public."user" TO postgres;

// -- SELECT * FROM public."user" WHERE "userID" = 1;



// SELECT "table_name", "column_name", "data_type"
// FROM information_schema.columns
// WHERE "tables_name" = public."conversation";
// **********************************************************
// INSERT INTO public.inbox("lastSentAuthor", "lastMessTime", "lastMessText")
// VALUES 		(1, '2022-10-10 11:30:30', 'Halo Halo');
// **********************************************************
// -- INSERT INTO public.conversation(
// -- 	"userID", "friendID", "inboxID")
// -- 	VALUES (1, 3, 1);

// SELECT * FROM public.conversation;
// **********************************************************
// INSERT INTO public.message(
// 	"messTxt", "authorID", "sentAt")
// 	VALUES ('Szczęść boże', 3, '2022-10-10 11:30:30');
// **********************************************************
const {Client} = require('pg');

// Function to create new Client object (needed to single query)
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

module.exports = {createClientDB};