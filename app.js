const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const cors = require("cors");
class WhatDate {
  getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
  }
  async find(params) {
    return { eddies_hire_date: this.getDateTime() };
  }
}
const host = "0.0.0.0";
const port = process.env.PORT || 4000;
const app = express(feathers());
app.use(cors());
// Turn on JSON body parsing for REST services
app.use(express.json());
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());
// Initialize the WhatDate service by creating
// a new instance of our class
app.use("whatdate", new WhatDate());
// Set up an error handler that gives us nicer errors
app.use(express.errorHandler());
// Start the server on port
const server = app.listen(port, host);
server.on("listening", () => {
  console.log(
    "Eddie's Start Date REST API started at http://localhost:" + port.toString()
  );
});

async function getDate() {
  const mydate = await app.service("whatdate").find();
  console.log("My Perfect Start Date & Time is : " + mydate.eddies_hire_date);
}
getDate();
