const express = require("express");
const config = require("./config");
const connect = require("./db/connect");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(notFound);

const port = config.APP_PORT || 5000;

const start = async () => {
  try {
    await connect();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()