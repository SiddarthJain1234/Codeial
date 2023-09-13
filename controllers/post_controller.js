const Post =require('../models/post');
const User =require('../models/user');
const Comment =require('../models/comment');
module.exports.savepost=async (req,res)=> {
    let post=await Post.create({content:req.body.content,user:req.user._id});
    let user=await User.findById(req.user._id);

    user.posts.push(post);
    await User.findByIdAndUpdate(req.user._id,user);

    res.redirect('back');
   
   }

   //ToDo : add one more check to check user who is removing post , posted this post.
  
module.exports.deletepost=async (req,res)=>{
   
    let post =await Post.findById(req.params.id);
    let user=await User.findById(post.user);
   
    //find out post from posts array of user and delte it.
    let p=user.posts.filter((obj)=> obj._id != req.params.id);
    user.posts=p;

    await User.findByIdAndUpdate(post.user, user);

    await Comment.deleteMany({_id:post.comments});
    await Post.findByIdAndRemove(req.params.id);
    
    res.redirect('back');
}