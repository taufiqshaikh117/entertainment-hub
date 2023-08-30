const mongoose = require("mongoose");
const mongooseURL = "mongodb://localhost:27017/entertainmenthub";



const connectToMongoose = () =>{
    mongoose.connect(mongooseURL).then(()=>
        console.log("Connected to Mongoose"))
}

module.exports = connectToMongoose;