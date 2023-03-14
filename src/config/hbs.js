const { engine } = require("express-handlebars");

module.exports = (app) => {
  // handlebars
  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "src/views");
};
