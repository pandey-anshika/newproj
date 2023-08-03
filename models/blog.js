
const mongoose = require('mongoose');

const Blogs= mongoose.model('Blogs', new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    shortDes: {
        type: String,
        minlength: 5,
        maxlength: 30
    }, 
    desc: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    tags: ['DS', 'AI', 'ML', 'JAVA', 'Others']
}));

exports.Blogs=Blogs;