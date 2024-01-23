const { Blog } = require("../models/Blog");
const mongoose = require("mongoose");

module.exports.get_all_blogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        .select(" title content author ")
        .exec() // check to see if this is needed in code or if it runs without it
        if (blogs) {
            const response = {
                count: blogs.length,
                blogs: blogs.map((blog) => {
                    return {
                        title: blog.title,
                        content: blog.content,
                        author: blog.author
                    }
                })
            }
            res.status(200).json({
                message: "All available blogs are listed below",
                response: response,
                success: true
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error."
        })
    }
};


module.exports.get_blog_by_id = async (req, res) => {
    try {
        const blogId = req.params.id;
        // Get blog from database using blogId
        const blog = await Blog.findById({_id: blogId});
        if (blog) {
            res.status(200).json({
                blogPost: [
                    {
                        id: blog._id,
                        Title: blog.title,
                        Content: blog.content,
                        Author: blog.author,
                        CreatedAt: blog.createdAt
                    }
                ],
                success: true
            })
        }
        else {
            return res.status(404).json({
                message: "Error, no blogs matching this id was found!"
            });
        };
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    };
};


module.exports.post_create_new_blog = async (req, res) => {
    try {
        const { title, content, author } = req.body
        const blog = new Blog({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            content: content,
            author: author
        });
        await blog.save();
        res.status(201).json({
            message: "Blog post created Successfully!",
            blogPost: [
                {
                    id: blog._id,
                    Title: blog.title,
                    Content: blog.content,
                    Author: blog.author,
                    CreatedAt: blog.createdAt
                }
            ],
            success: true            
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};



module.exports.update_blog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const payload = req.body;
        // find blog matching id
        const blog = await Blog.findById({ _id: blogId })
        if (blog) {
            const updatedBlog = await Blog.findByIdAndUpdate({_id: blogId}, payload, { new: true });
            await updatedBlog.save();
            res.status(200).json({
                message: "Blogpost updated successfully",
                blogPost: [
                    {
                        id: updatedBlog._id,
                        Title: updatedBlog.title,
                        Content: updatedBlog.content,
                        Author: updatedBlog.author,
                        CreatedAt: updatedBlog.createdAt
                    }
                ],
                success: true   
            });
        }
        else {
            return res.status(404).json({
                message: "Could not find any blogs matching this blogId"
            });
        }
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    };
};


module.exports.delete_blog = async(req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById({ _id: blogId });
        if (blog) {
            await Blog.findByIdAndDelete({ _id: blogId });
            res.status(200).json({
                success: true,
                message: "Blog deleted!"
            })
        }
        else{
            return res.status(404).json({
                message: "Error! Couldn't find any blogs matching blog ID."
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};