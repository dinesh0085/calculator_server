const express=require("express");
const calculateModel=require("../Model/calculate.model");

const app=express.Router();


app.get("/",async(req,res)=>{
    const {annualAmount,annualRate,years} = req.body;
     
    let Total_Maturity=(annualAmount*(((((annualRate/100)+1)**years)-1)/(annualRate/100))).toFixed(0);
    let Total_Investment=(annualAmount*years).toFixed(0);
    let Total_Interest=(Total_Maturity-Total_Investment).toFixed(0)
    // console.log(Total_Interest);
    try{
    //  const calculate=new calculateModel({annualAmount,annualRate,years,Total_Maturity,Total_Investment,Total_Interest})
    //  await calculate.save()
     res.status(200).send({msg:"Calculated values",Total_Maturity,Total_Investment,Total_Interest})
    }catch(e){
        res.status(400).send({msg:"Something went wrong",error:e.message})
    }
})



module.exports=app