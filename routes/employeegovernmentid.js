var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employeegovernmentid", {
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
    let sql = `select * from employee_government_id`;
    mysql.Select(sql, "EmployeeGovernmentID", (err, result) => {
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
    let sssid = req.body.sssid;
    let pagibigid = req.body.pagibigid;
    let philhealth = req.body.philhealth;
    let tinid = req.body.tinid;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let employee_government_id = [];

    employee_government_id.push([
      employeeid,
      sssid,
      pagibigid,
      philhealth,
      tinid,
      status,
      createdby,
      createddate,
    ]);
    mysql.InsertTable(
      "employee_government_id",
      employee_government_id,
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
  // waiting for modal design
  try {
    let departmentnamemodal = req.body.departmentnamemodal;
    let employeeid = req.body.employeeid;

    let data = [departmentnamemodal, employeeid];

    let sql_Update = `UPDATE employee_government_id 
                     SET egi_departmentname = ?
                     WHERE egi_employeeid = ?`;

    let sql_check = `SELECT * FROM employee_government_id WHERE egi_employeeid='${employeeid}'`;

    console.log(data);

    mysql.Select(sql_check, "EmployeeGovernmentID", (err, result) => {
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

    let sql_Update = `UPDATE employee_government_id 
                     SET egi_status = ?
                     WHERE egi_employeeid = ?`;

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
