const express = require("express");
const bodyParser = require("body-parser");

/* ROUTES and how to import routes */
const allusers = require("./api/allusers");
const allschools = require("./api/web/allschools");
const validate = require("./api/web/validate");
const check = require("./api/web/check");
const adduserapp = require("./api/web/adduserapp");
const approveuser = require("./api/web/approveuser");
const addoperator = require("./api/web/addoperator");
const approvedops = require("./api/web/approvedops");
const notapprovedops = require("./api/web/notapprovedops");
const addprofessor = require("./api/web/addprofessor");
const addstudent = require("./api/web/addstudent");
const userinfo = require("./api/web/userinfo");
const newschool = require("./api/web/newschool");
const schlinfo = require("./api/web/schlinfo");
/* end of ROUTES and how to import routes */

const app = express();

console.log(`NODE_ENV = |${process.env.NODE_ENV}|`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-OBSERVATORY-AUTH"
  );
  next();
});

// /* Routes used by our project */
const baseurl = "/libraries";

app.use(baseurl + "/allusers", allusers);
app.use(baseurl + "/web/allschools", allschools);
app.use(baseurl + "/web/validate", validate);
app.use(baseurl + "/web/check", check);
app.use(baseurl + "/web/adduserapp", adduserapp);
app.use(baseurl + "/web/approveuser", approveuser);
app.use(baseurl + "/web/addoperator", addoperator);
app.use(baseurl + "/web/approvedops", approvedops);
app.use(baseurl + "/web/notapprovedops", notapprovedops);
app.use(baseurl + "/web/addprofessor", addprofessor);
app.use(baseurl + "/web/addstudent", addstudent);
app.use(baseurl + "/web/userinfo", userinfo);
app.use(baseurl + "/web/newschool", newschool);
app.use(baseurl + "/web/schlinfo", schlinfo);
// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found!" });
});

module.exports = app;
