var bcrypt = require("bcryptjs");
const User = require('../models/User')
var jwt = require("jsonwebtoken");
const config =require('../config/auth.config')

exports.signup = async(req , res , next)=>{
      const {  phone , password , firstname , lastname , type , farmertype} = req.body;
      let typeStr;
      if(type === "farmer"){
        typeStr = farmertype
      }else{
        typeStr = "none"
      }
        const user = new User({
          firstname,
          lastname,
          phone,
          password:bcrypt.hashSync(password, 8),
          role:type,
          farmertype:typeStr
        })
  
        const data = await user.save()
  
        if(!data){
          res.status(400).send("registration failed")
        }
  
        res.status(200).send(data)
  }
  

exports.signin = (req, res) => {
    User.findOne({
      phone: req.body.phone
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          id: user._id,
          firstname: user.firstname,
          lastname:user.lastname,
          phone: user.phone,
          role: user.role,
          accessToken: token,
          farmertype:user.farmertype
        });
      });
  };
  