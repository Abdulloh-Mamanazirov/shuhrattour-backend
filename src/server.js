const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRouter = require("./router/login");
const hotelsRouter = require("./router/hotels");
const flightsRouter = require("./router/flights");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(authRouter);
app.use("/hotels", hotelsRouter);
app.use("/flights", flightsRouter);

app.listen(PORT, () => console.log("Running on " + PORT));
