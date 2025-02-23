const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
},
{ 
    timestamps: true,
    versionKey: false,
}
);

const UserModel = mongoose.model("User", userSchema);


const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
};

module.exports = { UserModel, validateUser };
