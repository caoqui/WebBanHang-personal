const session = require("express-session");

module.exports = (app) => {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "askdghasd",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
};
