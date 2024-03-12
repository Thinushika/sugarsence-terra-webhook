const express = require("express");
const bodyParser = require("body-parser");
const { default: Terra } = require("terra-api");
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const DEV_ID = process.env.DEV_ID;
const SIGNING_SECRET = process.env.SIGNING_SECRET;

const terra = new Terra(API_KEY, DEV_ID, SIGNING_SECRET);


const app = express();
var options = {
  inflate: true,
  limit: "4000kb",
  type: "application/json",
};


app.use(bodyParser.raw(options));


app.post("/consumeTerraWebhook", function (req, res) {
  res.sendStatus(200);
  const data = JSON.parse(req.body);
  console.log(JSON.stringify(data));
  try {
    const verified = terra.checkTerraSignature(req.headers['terra-signature'], req.body);
  } catch(err) {
    const verified = false;
  };
});


const port = 3000;
app.listen(port);
console.log("Server started on port " + port);