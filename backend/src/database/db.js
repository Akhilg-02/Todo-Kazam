const mongoose = require("mongoose");
require('dotenv').config();

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); 
    }
}

connectDatabase().catch(err => console.error(err));

module.exports = connectDatabase;
