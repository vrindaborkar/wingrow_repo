const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
var bodyParser = require('body-parser');
const Trial = require("./models/Trial");

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

app.get('/trial' , async(req,res)=>{
  const data = await Trial.find()
  res.send(data)
})

app.post('/trial' , async(req,res,next)=>{
    const data = await new Trial(req.body);
    const resp = await data.save();

    if(!resp){
      res.status(400).json("failed to add")
    }
    res.status(200).json("added successfully")
})

app.put('/trial' , async(req,res,next)=>{
  const {data , user , time} = req.body;

  const updata = await Trial.updateMany({_id : {$in:data}} , {isBooked:true , bookedBy:user , bookedAt:time})

  if(!updata){
    res.status(400).json("failed to add")
  }
  const response = await Trial.find({_id : {$in:data}})
  res.status(200).json(response)
})


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
