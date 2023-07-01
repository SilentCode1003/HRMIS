var express = require("express");
var router = express.Router();
require('dotenv');

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("idtype", {
    title: process.env._TITLE,
    username: "",
    fullname: "DEV42",
    roletype: "Admin",
    accesstype: "DEVELOPER",
  });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_id_type`;
    mysql.Select(sql, "MasterIDType", (err, result) => {
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
    let idtypename = req.body.idtypename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let master_id_type = [];

    master_id_type.push([idtypename, status, createdby, createddate]);
    mysql.InsertTable("master_id_type", master_id_type, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({ msg: "success" });
    });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/edit", (req, res) => {
  try {
    let idnamemodal = req.body.idnamemodal;
    let idcode = req.body.idcode;

    let data = [idnamemodal, idcode];

    let sql_Update = `UPDATE master_id_type 
                     SET mit_idname = ?
                     WHERE mit_idcode = ?`;

    let sql_check = `SELECT * FROM master_id_type WHERE mit_idcode='${idcode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterIDType", (err, result) => {
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
    let idcode = req.body.idcode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, idcode];

    let sql_Update = `UPDATE master_id_type 
                     SET mit_status = ?
                     WHERE mit_idcode = ?`;

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
