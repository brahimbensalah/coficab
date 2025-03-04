const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/imprime.routes')
require ('./Models/index')

// const db = require('./database-mysql');


const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads"));


// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.use("/api/imprime",userRoutes);



app.listen(PORT, () => {
  console.log(`Express app listening on port http://localhost:${PORT}`);
});
