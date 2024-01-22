const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Please enter a username longer than 2 letters'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Please enter a password longer than 5 letters"]
    }
})


const User = mongoose.model('user', userSchema);

module.exports = { User };