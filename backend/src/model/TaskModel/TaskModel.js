const mongoose = require("mongoose");
const Joi = require("joi");


const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        dueDate: { type: Date, required: false },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { 
        timestamps: true,
        versionKey: false,
    } 
);


const Task = mongoose.model("Task", taskSchema);


const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        status: Joi.string().valid("pending", "completed").insensitive(), 
        dueDate: Joi.date(),
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
    });

    return schema.validate(task);
};

module.exports = { Task, validateTask };
