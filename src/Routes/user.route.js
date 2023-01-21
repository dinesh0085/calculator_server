const express=require("express");
const userModel=require("../Model/user.model");
const jwt=require("jsonwebtoken")
const secretKey=process.env.SECRET_KEY

const app=express.Router();

app.get("/",(req,res)=>{
    res.status(200).send({msg:"User section"})
})

app.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
     const user=new userModel({name,email,password});
     await user.save();
     res.status(201).send({msg:"User registration successfull",user})
    }catch(e){
        res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user=await userModel.findOne({email,password});
    console.log(user);
    try{
     if(user){
      const token=jwt.sign({id:user._id,name:user.name,email:user.email},secretKey,{
        expiresIn:"1 day"
      })
      res.status(200).send({msg:"User Login successfull",token})
     }else{
        res.status(404).send({msg:"User Not Found"})
     }
    }catch(e){
        res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})

app.get("/getProfile",async(req,res)=>{
    const token=req.headers["authorization"];

    const token_user=jwt.verify(token,secretKey)

    const user=await userModel.findOne({email:token_user.email});
    console.log(user);
    try{
     if(user){
      res.status(200).send({msg:"User Profile Details",user})
     }else{
        res.status(404).send({msg:"User Not Found"})
     }
    }catch(e){
        res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})

module.exports=app