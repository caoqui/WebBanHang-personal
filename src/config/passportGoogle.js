const db = require("../model/user.m");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const bcrypt = require('bcrypt');
const saltRounds = 10;




module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //chuyen gia trị lưu vào session
  passport.serializeUser(function (user, done) {
    var infoSession = {
      username: user[0].Username,
      userid : user[0].UserID,
    }

    done(null, infoSession);
  });

  //nhận dữ liệu từ session qua hàm này
  passport.deserializeUser(async function (name, done) {
    try {
        var user = await db.findByName(name);
        done(null, user);
    } catch (error) {
        done(err, null);
    }
  });

  passport.use(new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
      var user = await db.findByName(username);

      if (typeof user[0] != "object") { return done(null, false); }

      var cmp = bcrypt.compareSync(password, user[0].Password);
      if(!cmp) {
        return done(null, false);
      }
      return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};
