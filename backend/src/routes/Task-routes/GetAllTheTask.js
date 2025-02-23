const express = require("express");
const mongoose = require("mongoose");
const { Task } = require("../../model/TaskModel/TaskModel");
const verify = require("../../helper/verify");

const router = express.Router();


router.get("/:userId", verify, async (req, res) => {
    const { userId } = req.params;

   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        
        const userTasks = await Task.find({ userId });


        if (!userTasks || userTasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

 
        return res.status(200).json(userTasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
