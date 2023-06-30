var express = require("express");
var router = express.Router();

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");
const crypt = require("./repository/cryptography");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("users", {
    title: "HRMIS",
    username: "",
    fullname: "DEV42",
    roletype: "Admin",
    accesstype: "DEVELOPER",
  });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_user`;

    mysql.Select(sql, "MasterUser", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/save", (req, res) => {
  try {
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let roletype = req.body.roletype;
    let accesstype = req.body.accesstype;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let master_user = [];

    crypt.Encrypter(password, (err, encrypted) => {
      if (err) console.error("Error: ", err);

      master_user.push([
        fullname,
        username,
        encrypted,
        accesstype,
        roletype,
        status,
        createdby,
        createddate,
      ]);

      console.log(master_user);

      mysql.InsertTable("master_user", master_user, (err, result) => {
        if (err) console.error("Error: ", err);
        console.log(result);

        res.json({
          msg: "success",
        });
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/edit", (req, res) => {
  try {
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let roletype = req.body.roletype;
    let accesstype = req.body.accesstype;
    let usercode = req.body.usercode;

    crypt.Encrypter(password, (err, encrypted) => {
      if (err) console.error("Error: ", err);

      let data = [
        fullname,
        username,
        encrypted,
        roletype,
        accesstype,
        usercode,
      ];

      let sql_Update = `UPDATE master_user 
                       SET mu_fullname = ?,
                       mu_username = ?,
                       mu_password = ?,
                       mu_roletype = ?,
                       mu_accesstype = ?
                       WHERE mu_userid = ?`;

      mysql.UpdateMultiple(sql_Update, data, (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);

        res.json({
          msg: "success",
        });
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/status", (req, res) => {
  try {
    let usercode = req.body.usercode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, usercode];

    let sql_Update = `UPDATE master_user 
                     SET mu_status = ?
                     WHERE mu_userid = ?`;

    console.log(data);

    mysql.UpdateMultiple(sql_Update, data, (err, result) => {
      if (err) console.error("Error: ", err);

      res.json({
        msg: "success",
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
