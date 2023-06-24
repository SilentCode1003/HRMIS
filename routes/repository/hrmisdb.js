const mysql = require("mysql");
const model = require("../model/hrmismodel");
require("dotenv").config();
const crypt = require("./cryptography");

let password = "";
crypt.Decrypter(process.env._PASSWORD, (err, result) => {
  if (err) throw err;

  password = result;
  // console.log(`${result}`);
});

const connection = mysql.createConnection({
  host: process.env._HOST,
  user: process.env._USER,
  password: password,
  database: process.env._DATABASE,
});

// crypt.Encrypter("#Ebedaf19dd0d", (err, result) => {
//   if (err) console.error("Error: ", err);

//   console.log(result);
// });

// crypt.Decrypter('f6a3287039d0d75cb83cb29d35b3dfcb', (err, result) => {
//     if (err) console.error('Error: ', err);

//     console.log(`${result}`);
// });

exports.CheckConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connection to MYSQL databases: ", err);
      return;
    }
    console.log("MySQL database connection established successfully!");
  });
};

exports.InsertMultiple = async (stmt, todos) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row inserted: ${results.affectedRows}`);

      return 1;
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Select = (sql, table, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      if (table == "MasterUser") {
        callback(null, model.MasterUser(results));
      }

      if (table == "MasterRoleType") {
        callback(null, model.MasterRoleType(results));
      }

      if (table == "MasterPositionType") {
        callback(null, model.MasterPositionType(results));
      }

      if (table == "MasterDepartment") {
        callback(null, model.MasterDepartment(results));
      }

      if (table == "MasterIDType") {
        callback(null, model.MasterDepartment(results));
      }

      if (table == "MasterAccessType") {
        callback(null, model.MasterAccessType(results));
      }

      if (table == "EmployeeDetails") {
        callback(null, model.EmployeeDetails(results));
      }

      if (table == "EmployementDetails") {
        callback(null, model.EmployementDetails(results));
      }

      if (table == "EmployeeEducation") {
        callback(null, model.EmployeeEducation(results));
      }

      if (table == "EmployeeWorkExperience") {
        callback(null, model.EmployeeWorkExperience(results));
      }

      if (table == "EmployeeReference") {
        callback(null, model.EmployeeReference(results));
      }

      if (table == "EmployeeGovernmentID") {
        callback(null, model.EmployeeGovernmentID(results));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.StoredProcedure = (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.StoredProcedureResult = (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.Update = async (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.UpdateMultiple = async (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CloseConnect = () => {
  connection.end();
};

exports.Insert = (stmt, todos, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        callback(err, null);
      }
      // callback(null, `Row inserted: ${results}`);
      callback(null, `Row inserted: ${results.affectedRows}`);
      // console.log(`Row inserted: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.SelectResult = (sql, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.InsertTable = (tablename, data, callback) => {
  if (tablename == "master_user") {
    let sql = `INSERT INTO master_user(
            mu_fullname,
            mu_username,
            mu_password,
            mu_role,
            mu_position,
            mu_status,
            mu_createdby,
            mu_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_role_type") {
    let sql = `INSERT INTO master_role_type(
            mrt_rolename,
            mrt_status,
            mrt_createdby,
            mrt_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_position_type") {
    let sql = `INSERT INTO master_position_type(
            mpt_positionname,
            mpt_status,
            mpt_createdby,
            mpt_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_department") {
    let sql = `INSERT INTO master_department(
            md_departmentname,
            md_status,
            md_createdby,
            md_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_access_type") {
    let sql = `INSERT INTO master_access_type(
            mat_accessname,
            mat_status,
            mat_createdby,
           mat_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_id_type") {
    let sql = `INSERT INTO master_id_type(
            mit_idname,
            mit_status,
            mit_createdby,
            mit_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_user") {
    let sql = `INSERT INTO master_user(
              mu_fullname,
              mu_password,
              mu_accesstype,
              mu_roletype,
              mu_status,
              mu_createdby,
              mu_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employee_details") {
    let sql = `INSERT INTO employee_details(
            ed_firstname,
            ed_middlename,
            ed_lastname,
            ed_gender,
            ed_dateofbirth,
            ed_address,
            ed_contactnumber,
            ed_email,
            ed_nationality,
            ed_maritalstatus,
            ed_emergencycontact name,
            ed_emergencycontactnumber,
            ed_status,
            ed_createdby,
            ed_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employement_details") {
    let sql = `INSERT INTO employement_details(
            emd_employeeid,
            emd_department,
            emd_dateofhire,
            emd_employmentstatus,
            emd_salary,
            emd_probationperiod,
            emd_performancereviewschedule,
            emd_status,
            emd_createdby,
            emd_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employee_education") {
    let sql = `INSERT INTO employee_education(
            ee_employeeid,
            ee_degree,
            ee_fieldofstudy,
            ee_institution,
            ee_graduationdate,
            ee_status,
            ee_createdby,
            ee_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employee_work_experience") {
    let sql = `INSERT INTO employee_work_experience(
            ewe_employeeid,
            ewe_company,
            ewe_jobtitle,
            ewe_startdate,
            ewe_enddate,
            ewe_jobdescription,
            ewe_status,
            ewe_createdby,
            ewe_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employee_reference") {
    let sql = `INSERT INTO employee_reference(
            er_employeeid,
            er_referencename,
            er_relationship,
            er_contactinfo,
            er_status,
            er_createdby,
            er_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "employee_government_id") {
    let sql = `INSERT INTO employee_government_id(
            egi_employeeid,
            egi_sssid,
            egi_pagibigid,
            egi_philhealth,
            egi_tinid,
            egi_status,
            egi_createdby,
            egi_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }
};

exports.isDataExist = (sql, tablename) => {
  return new Promise((resolve, reject) => {
    this.Select(sql, tablename, (err, result) => {
      if (err) reject(err);

      if (result.length != 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.isSingleDataExist = (sql, tablename, callback) => {
  this.Select(sql, tablename, (err, result) => {
    if (err) callback(err, null);

    if (result.length != 0) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};
