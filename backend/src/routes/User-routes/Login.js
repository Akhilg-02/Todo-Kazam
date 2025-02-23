const express = require("express");
const router = express.Router();
const {UserModel} = require("../../model/UserModel/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")



router.post("/",async (req, res) => {
   
    const data = req.body;

    const { email, password } = data;

    if (!email) {
        return res.send("Please enter your email");
    }

    if (!password) {
        return res.send("Please enter your password");
    }

    try {
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            const result = await bcrypt.compare(password, userExist.password);

            if (result) {
                //jwt sign method was throwing an error that it require plan object that is by i had to restructure the obj
                const userObject = {
                    _id:userExist._id,
                    username: userExist.username,
                    name: userExist.name,
                    email: userExist.email,
                    password: userExist.password,
                  
                };

                var token = jwt.sign(userObject,process.env.SECRET_KEY);
                return res.send({token:token,message:"login successful", "userId":userExist._id});
            } else {
                return res.send("Invalid password");
            }
        } else {
            return res.send("Invalid user");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;