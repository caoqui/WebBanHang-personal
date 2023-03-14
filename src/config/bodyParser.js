const bodyParser = require("body-parser");

module.exports = (app) => {
  // body Parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
