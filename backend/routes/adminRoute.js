const express = require("express");

const router = express.Router();

const adminController =require("../controllers/adminController");

console.log(adminController);

router.post(
    "/login",
    adminController.loginAdmin
);
router.post(
    "/create",
    adminController.createAdmin
);
// {
//     "email": "shrawansinh@gmail.com",
//     "password": "shrawansinh@123"
// }

module.exports = router;