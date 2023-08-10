var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employeeworkexperience", {
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
    let sql = `select * from employee_work_experience`;
    mysql.Select(sql, "EmployeeWorkExperience", (err, result) => {
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
    let company = req.body.company;
    let jobtitle = req.body.jobtitle;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let jobdescription = req.body.jobdescription;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = 'Joseph Orencio';
    let createddate = helper.GetCurrentDatetime();
    let employee_work_experience = [];
    let sql_check = `select * from employee_work_experience where ewe_employeeid='${employeeid}'`;

    mysql
      .isDataExist(sql_check, "EmployeeWorkExperience")
      .then((result) => {
        if (result) {
          return res.json({
            msg: "duplicate",
          });
        } else {
          employee_work_experience.push([
            employeeid,
            company,
            jobtitle,
            startdate,
            enddate,
            jobdescription,
            status,
            createdby,
            createddate,
          ]);
          mysql.InsertTable(
            "employee_work_experience",
            employee_work_experience,
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

    let sql_Update = `UPDATE employee_work_experience 
                     SET ewe_departmentname = ?
                     WHERE ewe_employeeid = ?`;

    let sql_check = `SELECT * FROM employee_work_experience WHERE ewe_employeeid='${employeeid}'`;

    console.log(data);

    mysql.Select(sql_check, "EmployeeWorkExperience", (err, result) => {
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

    let sql_Update = `UPDATE employee_work_experience 
                     SET ewe_status = ?
                     WHERE ewe_employeeid = ?`;

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
