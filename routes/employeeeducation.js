var express = require("express");
var router = express.Router();
require("dotenv");

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("employeeeducation", {
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
    let sql = `select * from employee_education`;
    mysql.Select(sql, "EmployeeEducation", (err, result) => {
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
    let degree = req.body.degree;
    let fieldofstudy = req.body.fieldofstudy;
    let institution = req.body.institution;
    let graduationdate = req.body.graduationdate;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = 'Joseph Orencio';
    let createddate = helper.GetCurrentDatetime();
    let employee_education = [];
    let sql_check = `select * from employee_education where ee_employeeid='${employeeid}'`;

    mysql
      .isDataExist(sql_check, "EmployeeEducation")
      .then((result) => {
        if (result) {
          return res.json({
            msg: "duplicate",
          });
        } else {
          employee_education.push([
            employeeid,
            degree,
            fieldofstudy,
            institution,
            graduationdate,
            status,
            createdby,
            createddate,
          ]);
          mysql.InsertTable(
            "employee_education",
            employee_education,
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
    let departmentcode = req.body.departmentcode;

    let data = [departmentnamemodal, departmentcode];

    let sql_Update = `UPDATE employee_education 
                     SET ee_departmentname = ?
                     WHERE employeeid = ?`;

    let sql_check = `SELECT * FROM employee_education WHERE employeeid='${departmentcode}'`;

    console.log(data);

    mysql.Select(sql_check, "EmployeeEducation", (err, result) => {
      // waiting for modal design
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

    let sql_Update = `UPDATE employee_education 
                     SET ee_status = ?
                     WHERE employeeid = ?`;

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
