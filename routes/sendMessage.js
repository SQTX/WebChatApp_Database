function sendMessage(app) {
  app.post("/chat/Marcin/mess/:messTxt", (req, res) => {
    console.log(req.params.messTxt);
  });
}

module.exports = sendMessage;
