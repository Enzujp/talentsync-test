const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},

{
    timestamps: true
}
)

const Blog = mongoose.model('blog', blogSchema);

module.exports = { Blog };