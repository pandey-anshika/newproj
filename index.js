const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user');
const {mw} = require('./mw/middleware');
// const blogRouter =require('./routes/user');
const { default: blogRouter } = require('./routes/blog');

app.use('/api/user',router);
app.use(express.json());
app.use(mw);
app.use('/api/blog',blogRouter);

mongoose.connect("mongodb://127.0.0.1:27017/newwprod")
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err));

app.use('/api', (req,res)=>{
    res.send('hello');
});

app.listen(3000);