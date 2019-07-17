const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//console.log(process.env.NODE_ENV);

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "majakulpa",
    password: "",
    database: "face-reco"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/signup", (req, res) => {
  signup.handleSignup(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${process.env.port} `);
});
