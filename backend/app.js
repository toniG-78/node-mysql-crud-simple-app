const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = require("./server");
const routes = require("./routes/routes");
const database = require("./database");

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes *********
app.use("/names", routes);
