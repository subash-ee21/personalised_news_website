const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/loginsignup")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB:", error);
    });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;