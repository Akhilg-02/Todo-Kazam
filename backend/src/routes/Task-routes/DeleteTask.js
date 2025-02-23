const express = require("express");
const mongoose = require("mongoose");
const verify = require("../../helper/verify");
const { Task } = require("../../model/TaskModel/TaskModel");

const router = express.Router();

// Route to delete a task by ID
router.delete("/:taskId", verify, async (req, res) => {
    const { taskId } = req.params;

    // Validate taskId as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID format" });
    }

    try {
        // Check if the task exists before deleting
        const existingTask = await Task.findById(taskId);

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Delete the task
        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully",
            deletedTaskId: taskId,
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
