const mongoose = require('mongoose')
require("dotenv").config()
const connectDB = async () => {
    const MONGO_URI  = process.env.MONGO_URI ;
    try {
        const response = await mongoose.connect(MONGO_URI)
        console.log("Database Connected succesfully ");
    } catch (error) {
        console.log("Error in Connection",error);
    }   
}
module.exports = { connectDB }
