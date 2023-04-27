const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { connection } = require("./config/db");
const UserRoutes = require("./routes/user.route");
const { authenticate } = require("./middleware/autenticate.middleware");
const ProfileRoutes = require("./routes/profile.route");

const app = express();
app.use(express.json());

app.use(cors({origin:"*"}));
app.use("/user",UserRoutes);

// app.use("/",(err,res)=>{
//     res.send("welcome to the backend server");
// })

app.use(authenticate);

app.use("/profile",ProfileRoutes)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongo");
    }
    catch(err){
        console.log("msg:",err);
    }
    console.log(`connected to port ${process.env.port} successfully`)
})
