const express = require('express');
const { UserModel, validateUser } = require("../../model/UserModel/UserModel");

const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = req.body;


    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username: data.username });
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create a new user with the hashed password and other data
        const newUser = await UserModel.create({
            ...data,
            password: hashedPassword,
        });

        res.status(201).send({message:"Registration Successful", newUser:newUser});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
