var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employeereference", {
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
    let sql = `select * from employee_reference`;
    mysql.Select(sql, "EmployeeReference", (err, result) => {
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
    let employeeid = req.body.employeeid;
    let referencename = req.body.referencename;
    let relationship = req.body.relationship;
    let contactinfo = req.body.contactinfo;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let employee_reference = [];
    let sql_check = `select * from employee_reference where er_employeeid='${employeeid}'`;

    mysql
      .isDataExist(sql_check, "EmployeeReference")
      .then((result) => {
        if (result) {
          return res.json({
            msg: "duplicate",
          });
        } else {
          employee_reference.push([
            employeeid,
            referencename,
            relationship,
            contactinfo,
            status,
            createdby,
            createddate,
          ]);
          mysql.InsertTable(
            "employee_reference",
            employee_reference,
            (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);
              res.json({ msg: "success" });
            }
          );
        }
      })
      .catch((error) => {
        res.json({
          msg: error,
        });
      });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/edit", (req, res) => {
  try {
    let departmentnamemodal = req.body.departmentnamemodal;
    let employeeid = req.body.employeeid;

    let data = [departmentnamemodal, employeeid];

    let sql_Update = `UPDATE employee_reference 
                     SET er_departmentname = ?
                     WHERE er_employeeid = ?`;

    let sql_check = `SELECT * FROM employee_reference WHERE er_employeeid='${employeeid}'`;

    console.log(data);

    mysql.Select(sql_check, "EmployeeReference", (err, result) => {
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
    let employeeid = req.body.employeeid;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, employeeid];

    let sql_Update = `UPDATE employee_reference 
                     SET er_status = ?
                     WHERE er_employeeid = ?`;

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
