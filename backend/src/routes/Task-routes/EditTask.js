const express = require("express");
const mongoose = require("mongoose");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();


router.patch("/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const updateData = req.body;

  
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID format" });
    }

  
    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    try {
  
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
            new: true,        
            runValidators: true, 
        });

        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
