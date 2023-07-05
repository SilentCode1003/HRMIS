var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employmentdetails", {
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
    let sql = `select * from employement_details`;
    mysql.Select(sql, "EmployementDetails", (err, result) => {
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
    let department = req.body.department;
    let dateofhire = req.body.dateofhire;
    let employmentstatus = req.body.employmentstatus;
    let salary = req.body.salary;
    let probationperiod = req.body.probationperiod;
    let performancereviewschedule = req.body.performancereviewschedule;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let employment_details = [];
    let sql_check = `select * from employment_details where emd_employeeid='${employeeid}'`;

    mysql
      .isDataExist(sql_check, "EmploymentDetails")
      .then((result) => {
        if (result) {
          return res.json({
            msg: "duplicate",
          });
        } else {
          employment_details.push([
            employeeid,
            department,
            dateofhire,
            employmentstatus,
            salary,
            probationperiod,
            performancereviewschedule,
            status,
            createdby,
            createddate,
          ]);
          mysql.InsertTable(
            "employment_details",
            employment_details,
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
  // waiting for modal design
  try {
    let departmentnamemodal = req.body.departmentnamemodal;
    let departmentcode = req.body.departmentcode;

    let data = [departmentnamemodal, departmentcode];

    let sql_Update = `UPDATE employment_details 
                     SET emd_departmentname = ?
                     WHERE emd_departmentcode = ?`;

    let sql_check = `SELECT * FROM employment_details WHERE emd_departmentcode='${departmentcode}'`;

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
    let employeeid = req.body.employeeid;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, employeeid];

    let sql_Update = `UPDATE employement_details 
                     SET emd_status = ?
                     WHERE emd_employeeid = ?`;

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
