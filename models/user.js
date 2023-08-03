
const mongoose = require('mongoose');


const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    unique: true
  },
  mobileNo: {
    type: Number,
    required: true
  },
  emailId: {
    type: String,
    unique:true
  },
  bio:{
    type: String,
    minlength: 3,
    maxlength: 100
  },
  forgotPassword:{
    data: String,
    default: {}
  },
  blogs: [{type: mongoose.Types.ObjectId, ref: "Blogs", required: true}]
}));

exports.User = User;