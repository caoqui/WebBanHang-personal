const express = require("express");
const router = express.Router();

const productsC = require("../controllers/products.c");

router.get("/", productsC.byCate);
router.get("/:cate", productsC.byCate);

module.exports = router;
