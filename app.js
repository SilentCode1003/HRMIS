var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mysql = require("./routes/repository/hrmisdb");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var departmentRouter = require("./routes/department");
var accesstypeRouter = require("./routes/accesstype");
var roletypeRouter = require("./routes/roletype");
var positionRouter = require("./routes/position");
var usersRouter = require("./routes/users");
var idtypeRouter = require("./routes/idtype");
var employeedetailsRouter = require("./routes/employeedetails");
var employeeeducationRouter = require("./routes/employeeeducation");
var employeeworkexperienceRouter = require("./routes/employeeworkexperience");
var employeereferenceRouter = require("./routes/employeereference");
var employeegovernmentidRouter = require("./routes/employeegovernmentid");
var employmentdetailsRouter = require("./routes/employmentdetails");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/department", departmentRouter);
app.use("/accesstype", accesstypeRouter);
app.use("/roletype", roletypeRouter);
app.use("/position", positionRouter);
app.use("/users", usersRouter);
app.use("/idtype", idtypeRouter);
app.use("/employeedetails", employeedetailsRouter);
app.use("/employeeeducation", employeeeducationRouter);
app.use("/employeegovernmentid", employeegovernmentidRouter);
app.use("/employeereference", employeereferenceRouter);
app.use("/employeeworkexperience", employeeworkexperienceRouter);
app.use("/employmentdetails", employmentdetailsRouter);

mysql.CheckConnection();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//default page

app.use("/", function (req, res) {
  res.redirect("/login");
});
