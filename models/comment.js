const mongoose =require('mongoose');
const { Schema } = require('mongoose');

const commentSchema=new mongoose.Schema({

    content :{
        type: String,
        required:true
    },
    user:{
        type :Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type :Schema.Types.ObjectId,
        ref:"Post"
    }
},
{
    timestamps : true
})


const comment=mongoose.model('Comment',commentSchema);
module.exports=comment;