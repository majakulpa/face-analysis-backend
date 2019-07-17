const dotenv = require("dotenv");

//dotenv.config({ path: "./../config.env" });
const Clarifai = require("clarifai");

// const app = new Clarifai.App({
//   apiKey: process.env.API_KEY
// });

const app = new Clarifai.App({
  apiKey = "3570eb29360d458db5fe41978fdbf9ed"
});



const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get count"));
};

module.exports = {
  handleImage,
  handleApiCall
};
