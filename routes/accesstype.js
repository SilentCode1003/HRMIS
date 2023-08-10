var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("accesstype", {
    title: process.env._TITLE,
    username: "DEV42",
    fullname: 'Joseph Orencio',
    roletype: "Admin",
    accesstype: "DEVELOPER",
  });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_access_type`;
    mysql.Select(sql, "MasterAccessType", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({ msg: "success", data: result });
    });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/save", (req, res) => {
  try {
    let accesstypename = req.body.accesstypename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = 'Joseph Orencio';
    let createddate = helper.GetCurrentDatetime();
    let master_access_type = [];

    master_access_type.push([accesstypename, status, createdby, createddate]);
    mysql.InsertTable(
      "master_access_type",
      master_access_type,
      (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);
        res.json({ msg: "success" });
      }
    );
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/edit", (req, res) => {
  try {
    let accesstypenamemodal = req.body.accesstypenamemodal;
    let accesstypecode = req.body.accesstypecode;

    let data = [accesstypenamemodal, accesstypecode];

    let sql_Update = `UPDATE master_access_type 
                     SET mat_accessname = ?
                     WHERE mat_accesscode = ?`;

    let sql_check = `SELECT * FROM master_access_type WHERE mat_accesscode='${accesstypecode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterAccessType", (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 1) {
        return res.json({
          msg: "notexist",
        });
      } else {
        mysql.UpdateMultiple(sql_Update, data, (err, result) => {
          if (err) console.error("Error: ", err);

          console.log(result);

          res.json({
            msg: "success",
          });
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/status", (req, res) => {
  try {
    let accesstypecode = req.body.accesstypecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, accesstypecode];

    let sql_Update = `UPDATE master_access_type 
                     SET mat_status = ?
                     WHERE mat_accesscode = ?`;

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
