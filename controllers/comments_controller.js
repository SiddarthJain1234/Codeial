const Comment=require('../models/comment');
const Post=require('../models/post')
const User=require('../models/user')
var postid="";

module.exports.showcomments=async function (req,res){

    const {id} = req.params; 
    postid=id;
    res.render('comments',{comments :await findCommentsbyPostId(),title:'comments'});
}

module.exports.docomment=async function(req,res){
    let comment=await Comment.create({content:req.body.comment,user:req.user._id,post:postid});
    let post=await Post.findById(postid);
    post.comments.push(comment);
    await Post.findByIdAndUpdate(postid,post);
    res.render('comments',{comments :await findCommentsbyPostId(),title:'comments'});
}


module.exports.deletecomment=async function(req, res){

    const {id} = req.params; 
    //let comment=await Comment.findById(id);
    let c =await Comment.findById(id).populate("post");
    
    let post=c.post;

    let updatedComments=post.comments.filter((obj)=> obj._id != id);
    post.comments=updatedComments;
    
    await Post.findByIdAndUpdate(post.id,{comments: updatedComments});
    let p=await Post.findById(post._id);

    await Comment.findByIdAndRemove(id);

    res.render('comments',{comments :await findCommentsbyPostId(),title:'comments'});

}

async function findCommentsbyPostId(){
    let post=await Post.findById(postid);
    let commentsids =post.comments;
    
    let comments=[];
    for(let i=0; i<commentsids.length; i++){
        let t=await Comment.findById(commentsids[i]);
       comments[i]=t;
       let u=await User.findById(comments[i].user);
        comments[i].user=u;
    }
    return comments;
}