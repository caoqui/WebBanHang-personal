const express = require("express");
const path = require("path");
const app = express();
const https = require("https");
require("dotenv").config();

const port = process.env.PORTAUTH || 3000;
const hostname = "localhost";

app.use(express.static(path.join(__dirname, "/public")));

const router = require("./routes/main_auth.r");

// Requiring file system to use local files
const fs = require("fs");

// session
require("./config/session")(app);
 
//handlebars
require("./config/hbs")(app);

//passport
require("./config/passport")(app);

//body-Parsers
require("./config/bodyParser")(app);

router(app);

const options = {
    key: fs.readFileSync("src/cetificates/server.key"),
    cert: fs.readFileSync("src/cetificates/server.cert"),
};
    

https.createServer(options, app).listen(port, () => {
    console.log(`server Auth is running at http://${hostname}:${port}`);
});