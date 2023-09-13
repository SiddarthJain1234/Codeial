const { Schema } = require('mongoose');
const mongoose =require('mongoose');


const postSchema=new mongoose.Schema({

    content :{
        type: String,
        required:true
    },
    user:{
        type :Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[
        {
            type :Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
},
{
    timestamps : true
})

const Post=mongoose.model('Post',postSchema);
module.exports=Post;
