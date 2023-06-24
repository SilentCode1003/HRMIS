var express = require("express");
var router = express.Router();

const mysql = require("./repository/hrmisdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("position", {
    title: "HRMIS",
    username: "",
    fullname: "DEV42",
    roletype: "Admin",
    accesstype: "DEVELOPER",
  });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_position_type`;
    mysql.Select(sql, "MasterPositionType", (err, result) => {
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
    let positionname = req.body.positionname;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = "DEV42";
    let createddate = helper.GetCurrentDatetime();
    let master_position_type = [];

    master_position_type.push([positionname, status, createdby, createddate]);
    mysql.InsertTable(
      "master_position_type",
      master_position_type,
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
  try {
    let positionnamemodal = req.body.positionnamemodal;
    let positioncode = req.body.positioncode;

    let data = [positionnamemodal, positioncode];

    let sql_Update = `UPDATE master_position_type 
                     SET mpt_positionname = ?
                     WHERE mpt_positioncode = ?`;

    let sql_check = `SELECT * FROM master_position_type WHERE mpt_positioncode='${positioncode}'`;

    console.log(data);

    mysql.Select(sql_check, "MasterPositionType", (err, result) => {
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
    let accesstypecode = req.body.accesstypecode;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, accesstypecode];

    let sql_Update = `UPDATE master_access_type 
                     SET mat_status = ?
                     WHERE mat_accesscode = ?`;

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
