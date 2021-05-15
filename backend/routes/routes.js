const express = require("express");
const routes = express.Router();
const dbService = require("../database");
const { response } = require("../server");

//GET all names********************************
routes.get("/all", (req, res) => {
  //Database Service
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();
  //
  //RETURN A PROMISE
  result
    .then((data) => {
      res.json({ names: data }); //it's an array of objets
    })
    .catch((err) => console.log(err));
});

//POST a name**********************************
routes.post("/add", (req, res) => {
  const { name } = req.body;
  //console.log(name);
  const db = dbService.getDbServiceInstance();
  const result = db.insertName(name);
  //
  //RETURN A PROMISE
  result
    .then((data) => {
      console.log(data);
      res.json({
        name: data, //obj
      });
    })
    .catch((err) => console.log(err));
});

module.exports = routes;
