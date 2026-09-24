// This file is used to create an admin user in the database. You can run this file using the command "node backend/seeds/createAdmin.js" in the terminal.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const dotenv = require("dotenv");
const connectDb = require("../config/db");
dotenv.config();
console.log(process.env.MONGO_URL);


const createAdmin = async()=>{
    try{
        await connectDb();
        const admin = await Admin.create({
            email: "shrawansinhpprankada@gmail.com",
            password: await bcrypt.hash("shrawansinh@123",10)
        })
    }catch(error){
        console.log(error.message);
        process.exit(0);
    }
}
createAdmin();