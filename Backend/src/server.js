const express = require("express");
const cors=require("cors")
const app = express();
console.log("hello_backend");
require("dotenv").config()
require("./Database/Database").connectDB(); //  database connection 
const multer = require("multer");

app.use(cors());

// BodyParser

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer().any());


//Router
const userRouter = require("./Router/userRouter");
app.use("/user",userRouter)


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

