const mongoose=require("mongoose")

const CalculateSchema=new mongoose.Schema({
    annualAmount:{
        type:Number,
        required:true
    },
    annualRate:{
        type:Number,
        required:true,
    },
    years:{
        type:Number,
        required:true
    },
    Total_Maturity:{
        type:Number,
    },
    Total_Investment:{
        type:Number,
    },
    Total_Interest:{
        type:Number,
    }

},{timestamps:true,versionKey:false})

const calculateModel=mongoose.model("calculate",CalculateSchema);

module.exports=calculateModel