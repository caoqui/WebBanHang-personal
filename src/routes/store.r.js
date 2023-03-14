const express = require("express");
const router = express.Router();

const orderC = require("../controllers/store.c");

router.post("/", orderC.addToStore);
router.get("/handle", orderC.handle);
router.post("/handle/delete/:proId", orderC.delete);


module.exports = router;
