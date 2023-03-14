const express = require("express");
const router = express.Router();

const passport = require("passport");

const userC = require("../controllers/user.c");

router.get("/login", userC.login);
router.post("/login", passport.authenticate("local", {
    failureRedirect: "https://localhost:3113/user/login/?error=1",
    failureMessage: true,
  }),userC.postSingIn);
router.get("/singup", userC.singup);
router.post("/singup", userC.postSingUp);
router.get("/singout", userC.singOut);


router.post("/jwt", userC.jwtLogin);
router.post("/access", userC.postAccess);


module.exports = router;
