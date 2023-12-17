const express = require("express");
const app = express();


const port = 5000

const start = () => {
  try {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  } catch (error) {
    throw new Error(error)
  }
}

start()