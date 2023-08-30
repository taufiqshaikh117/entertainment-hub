


const express = require("express");
const connectToMongoose=require("./db");
const cors = require("cors");


const app = express();

app.use(express.json());
connectToMongoose();
app.use(cors());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/userdetails",require("./routes/userdetails"));




app.get("/",(req,res)=>{
    res.send("Prescription Management System Server Running....");
})

app.listen(8080,()=>{
    console.log("Listening on 8080");
})