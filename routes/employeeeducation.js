var express = require("express");
var router = express.Router();
require('dotenv');

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employeedetails", {
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
    let sql = `select * from master_department`;
    mysql.Select(sql, "MasterDepartment", (err, result) => {
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
    let departmentname = req.body.departmentname;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let master_department = [];

    master_department.push([departmentname, status, createdby, createddate]);
    mysql.InsertTable("master_department", master_department, (err, result) => {
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
    let departmentnamemodal = req.body.departmentnamemodal;
    let departmentcode = req.body.departmentcode;

    let data = [departmentnamemodal, departmentcode];

    let sql_Update = `UPDATE master_department 
                     SET md_departmentname = ?
                     WHERE md_departmentcode = ?`;

    let sql_check = `SELECT * FROM master_department WHERE md_departmentcode='${departmentcode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterDepartment", (err, result) => {
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
    let departmentcode = req.body.departmentcode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, departmentcode];

    let sql_Update = `UPDATE master_department 
                     SET md_status = ?
                     WHERE md_departmentcode = ?`;

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
