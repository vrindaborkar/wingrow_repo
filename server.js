const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
var bodyParser = require('body-parser')

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/payment.routes")(app);

mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false} , 
    console.log("connected to db"));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
