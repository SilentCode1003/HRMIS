var express = require("express");
var router = express.Router();
require("dotenv");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: process.env._TITLE,
    username: "DEV42",
    fullname: 'Joseph Orencio',
    roletype: "Admin",
    accesstype: "DEVELOPER",
  });
});

module.exports = router;
