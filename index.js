const express = require("express");
const config = require("./config");
const connect = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./errorHandler");
// security packages
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors({ origin: "*" }));
app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(notFound);
app.use(errorHandler);

const port = config.APP_PORT || 5000;

const start = async () => {
  try {
    await connect(config.MONGO_URI);
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()