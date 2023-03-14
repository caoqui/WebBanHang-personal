const bcrypt = require('bcrypt');
const { password } = require('../config/cnStr');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const db = require("../model/user.m");

module.exports = {
  login: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("https://localhost:20560/products");
    }

    var err = req.query.error || 0;
    res.render("login", {
      error: err,
      errContent: "username or password is incorect."
    });
 },

 singup: (req, res) => {
  res.render("singup");
  },

  postSingUp: async (req, res) => {
    var username = req.body.username;
    var pass = req.body.password;
    var repass = req.body.repassword;
    var address  =req.body.address;
    var fullname = req.body.fullname;
    var sdt = req.body.sdt;
    var hashpass = await bcrypt.hash(pass, saltRounds);

    if (pass != repass) {
      return res.render("singup", {
        error: true,
        errContent: "password and repassword are not match.",
      });
    }
    var uNew = {
      Username: username,
      Password: hashpass,
      FullName: fullname,
      Address: address,
    };

    try {
      var user = await db.addNew(uNew);
      console.log("USER_SINGUP: ", user);

      res.redirect("/user/login");
    } catch (error) {
      return res.render("singup", {
        error: true,
        errContent: "username is existed already.",
      })
    }
  },

  postSingIn: async (req, res) => {
    if(req.isAuthenticated()) {
      return res.redirect("/products")
    }
    return res.redirect("https://localhost:3113/user/login/?error=1");
  },

  singOut: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/user/login");
      });
    } else {
      return res.redirect("/user/login");
    }
  },

  jwtLogin: async (req, res, next) => {
    var u = {
      username: "caoqui",
      password : "123321ok",
    }

    var token = jwt.sign({
      data: u
    }, process.env.SECRET, { expiresIn: 20 });

    res.json({token})
  },

  postAccess: async (req, res, next) => {
    const rtoken = req.header('Authorization');

    if(!rtoken) {
      return res.json('error');
    }

    jwt.verify(rtoken, process.env.SECRET, (err, decoded) => {
      if(err) {
        return next(err);
      }
      return res.json(decoded);
    });
  }
}
