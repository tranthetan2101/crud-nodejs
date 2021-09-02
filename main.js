const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const rfs = require("rotating-file-stream");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const connectDatabase =  require("./src/configs/db.config");
connectDatabase();

const port = process.env.PORT || 3333;

const isProduction = process.env.NODE_ENV === "production";

app.use(helmet());

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);

app.use(cors());

const routers = require('./src/routes/router')
app.use('/api', routers)

app.get("*", (req, res) => {
  res.json({
    message: "hello word",
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
