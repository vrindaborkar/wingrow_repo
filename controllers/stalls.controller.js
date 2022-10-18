const Stalls = require("../models/Stalls");

exports.getStalls = async(req,res)=>{
    const data = await Stalls.find()
    res.send(data)
  }
  
exports.postStalls = async(req,res,next)=>{
      const data = await new Stalls(req.body);
      const resp = await data.save();
  
      if(!resp){
        res.status(400).json("failed to add")
      }
      res.status(200).json("added successfully")
  }
  
 exports.putStalls = async(req,res,next)=>{
    const {data , user , time} = req.body;
  
    const updata = await Stalls.updateMany({_id : {$in:data}} , {isBooked:true , bookedBy:user , bookedAt:time})
  
    if(!updata){
      res.status(400).json("failed to add")
    }
    const response = await Stalls.find({_id : {$in:data}})
    res.status(200).json(response)
  }
  
  
  exports.resetStalls =  async(req,res,next)=>{
    const update = await Stalls.updateMany({} , {isBooked:false , bookedBy:"" , bookedAt:""})
  
    if(!update){
      res.status(400).json("failed")
    }
    res.status(200).json(update)
  }