require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connection = require("./connection/connection");
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", require("./routes/routes"));

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is Up & Running At Port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
