const express=require('express')
require("dotenv").config()
const cors=require("cors")
const connect=require("./Database/dbConnect")
const PORT=process.env.PORT
const userRoute=require("./Routes/user.route")
const calculateRoute=require("./Routes/calculate.route")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
 return res.send('Hello')
})
app.use("/user",userRoute)
app.use("/calculate",calculateRoute)


app.listen(PORT,async()=>{ 
    try{
    await connect();
    console.log("Database Connected Successfully");
    }catch(e){
     console.log(e.message);
    }
    console.log(`Listening Server to Port ${PORT}`)})