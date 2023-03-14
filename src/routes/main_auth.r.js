const userR = require("./user.r");

module.exports = (app) => {
  app.use("/user", userR);

  app.use("*", (req, res, next) => {
    next(new Error("Page not found."));
  });
  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });
};
