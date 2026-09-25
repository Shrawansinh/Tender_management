
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Check admin already exists
        const existingAdmin = await Admin.findOne({
            email: cleanEmail
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await Admin.create({
            email: cleanEmail,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                email: admin.email
            }
        });

    } catch (err) {

        console.log(err.message);

        return res.status(500).json({
            message: err.message
        });
    }
};

const loginAdmin = async (req, res) => {
      console.log("Before");

    try {
      
        //const { email, password } = req.body;
        console.log(req.body);

        // get data from frontend
        const email = req.body.email
            ?.trim()
            .toLowerCase();

        const password =
            req.body.password;

        console.log(email);

        // check admin exists
        // const adminExist =await Admin.findOne({
        //         email: email
        //     });
        const all = await Admin.find();
        console.log(all);
        const adminExist = all.find((admin) => admin.email === email);

      //  console.log(adminExist);

        // if admin not found
        if (!adminExist) {

            return res.status(400).json({
                message: "Admin not found"
            });
        }

        // compare password
        const isPassword =
            await bcrypt.compare(
                password,
                adminExist.password
            );

        // invalid password
        if (!isPassword) {

            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // generate JWT token
        const token = jwt.sign(

            {
                id: adminExist._id,
                email: adminExist.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "8d"
            }
        );

        // success response
        res.status(200).json({

            message:
            "Login Successfully",

            token,

            admin: adminExist
        });
        console.log("After");

    } catch (err) {

        console.log(err.message);

        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    loginAdmin,
    createAdmin
};