const express = require("express");
const verify = require("../../helper/verify");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

router.post("/", verify, async (req, res) => {
    const { title } = req.body;
    const userId = req.decoded._id; 

   
    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Please enter the Task Title" });
    }

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        
        const taskAlreadyExist = await Task.findOne({ 
            title: { $regex: new RegExp(`^${title}$`, "i") },
            userId: userId, 
        });

        if (taskAlreadyExist) {
            return res.status(400).json({ message: "This task is already in the queue" });
        }

       
        const newTask = new Task({
            title: title.trim(),
            status: "pending", // Default status
            userId, 
        });

        
        await newTask.save();

        return res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
