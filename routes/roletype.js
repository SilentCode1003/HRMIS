var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("roletype", {
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
    let sql = `select * from master_role_type`;
    mysql.Select(sql, "MasterRoleType", (err, result) => {
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
    let roletypename = req.body.roletypename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_role_type = [];

    master_role_type.push([roletypename, status, createdby, createddate]);
    mysql.InsertTable("master_role_type", master_role_type, (err, result) => {
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
    let roletypenamemodal = req.body.roletypenamemodal;
    let roletypecode = req.body.roletypecode;

    let data = [roletypenamemodal, roletypecode];

    let sql_Update = `UPDATE master_role_type 
                     SET mrt_rolename = ?
                     WHERE mrt_rolecode = ?`;

    let sql_check = `SELECT * FROM master_role_type WHERE mrt_rolecode='${roletypecode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterRoleType", (err, result) => {
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
    let roletypecode = req.body.roletypecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, roletypecode];

    let sql_Update = `UPDATE master_role_type 
                     SET mrt_status = ?
                     WHERE mrt_rolecode = ?`;

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
