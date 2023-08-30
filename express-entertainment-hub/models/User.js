
const mongoose =  require("mongoose");
const {Schema} = mongoose;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    favgenres: {
        type: [String]
    },
    favactors: {
        type: [String]
    },
    favmovies: {
        type: [String]
    },
    watchlist : {
        type: [String]
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
let Users = mongoose.model('users',userSchema);
Users.createIndexes();
module.exports = Users;
