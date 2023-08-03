const express = require('express');
const blogRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

const Blogs = require('../models/blog');
//const {getBlog, updateBlog, addBlog, getById, delBlog, getUserById} = require('../contorllers/blog');

blogRouter.get('/', async(req,res,next)=>{
    let blogs;
    try {
        blogs = await Blogs.find();
    } catch (err) {
        return console.log(err);
    }
    if(!blogs){
        return res.status(404);
    }
    return res.status(200);
});
blogRouter.post('/blog', async(req,res,next)=>{
    const {title, shortDes, desc, createdBy, createdAt, updatedAt}= req.body;
    let exUser;
    try{
        exUser = await User.findById(createdBy);
    }
    catch(err){
        return console.log(err);
    }
    if(!exUser){
        return res.status(500);
    }

    const blog = new Blogs({
        title,
        desc,
        shortDes,
        createdAt,
        createdBy,
        updatedAt
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exUser.blogs.push(blog);
        await exUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
    return res.status(200);
});
blogRouter.put('/update/:id', async(req,res,next)=>{
    const {title, desc}= req.body;
    const blogId = req.params.blogid;
    let blog;
    try {
        blog = await Blogs.findByIdAndUpdate(blogId, {
            title,
            desc
        })
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(500);
    }
    return res.status(200);
});
blogRouter.get('/:id',async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blogs.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404);
    }
    return res.status(200);
} );
blogRouter.delete('/:id', async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blogs.findByIdAndRemove(id).populate('createdBy');
        await blog.User.blogs.pull(blog);
        await blog.User.save();
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(400);
    }
    return res.status(200);
});
blogRouter.get('/user/:id', async(req,res,next)=>{
    const userId = req.params.id;
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate('blogs')
    } catch (err) {
        return console.log(err)
    }
    if(!userBlog){
        return res.status(404);
    }
    return res.status(200).json({blogs: userBlog});
});

module.exports= blogRouter;
