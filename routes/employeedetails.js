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
    let sql = `select * from employee_details`;
    mysql.Select(sql, "EmployeeDetails", (err, result) => {
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
    let firstname = req.body.firstname;
    let middlename = req.body.middlename;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let dateofbirth = req.body.dateofbirth;
    let email = req.body.email;
    let nationality = req.body.nationality;
    let address = req.body.address;
    let contactnumber = req.body.contactnumber;
    let maritalstatus = req.body.maritalstatus;
    let emergencycontactname = req.body.emergencycontactname;
    let emergencycontactnumber = req.body.emergencycontactnumber;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let employee_details = [];
    let currentcount = 0;
    let year = helper.GetCurrentYearEnd();
    let month = helper.GetCurrentMonth();
    let sql_check_count = `select count(*) as count from employee_details where ed_employeeid LIKE '${year}${month}%'`;
    let sql_check_dup = `select * from employee_details where ed_firstname='${firstname}' and ed_middlename='${middlename}' and ed_lastname='${lastname}'`;

    mysql
      .isDataExist(sql_check_dup,'EmployeeDetails')
      .then((result) => {
        if (result) {
          return res.json({
            msg: "duplicate",
          });
        } else {
          mysql.SelectResult(sql_check_count, (err, result) => {
            if (err) console.error("Error: ", err);

            currentcount = result[0].count + 1;

            let employeeid = `${year}${month}${helper.NumberPadded(
              currentcount,
              2
            )}`;

            employee_details.push([
              employeeid,
              firstname,
              middlename,
              lastname,
              gender,
              dateofbirth,
              address,
              contactnumber,
              email,
              nationality,
              maritalstatus,
              emergencycontactname,
              emergencycontactnumber,
              status,
              createdby,
              createddate,
            ]);
            mysql.InsertTable(
              "employee_details",
              employee_details,
              (err, result) => {
                if (err) console.error("Error: ", err);

                console.log(result);
                res.json({ msg: "success" });
              }
            );
          });
        }
      })
      .catch((error) => {
        res.json({ msg: error });
      });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/edit", (req, res) => { // waiting for modal design
  try {
    let departmentnamemodal = req.body.departmentnamemodal;
    let departmentcode = req.body.departmentcode;

    let data = [departmentnamemodal, departmentcode];

    let sql_Update = `UPDATE employee_details 
                     SET ed_departmentname = ?
                     WHERE ed_departmentcode = ?`;

    let sql_check = `SELECT * FROM employee_details WHERE ed_departmentcode='${departmentcode}'`;

    console.log(data);

    mysql.Select(sql_check, "EmployeeDetails", (err, result) => {
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

    let sql_Update = `UPDATE employee_details 
                     SET ed_status = ?
                     WHERE ed_employeeid = ?`;

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
