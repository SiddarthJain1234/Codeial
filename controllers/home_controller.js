const Post =require('../models/post');
const User = require('../models/user');
module.exports.home =async function(req, res){
  
    let posts=await Post.find({});
    for(let i=0; i<posts.length; i++){
        let u=await User.findById(posts[i].user);
        posts[i].user=u;
        
    }
    let users=await User.find({});
 
    return res.render('home', {
        title: "Home",
        posts:posts,
        users:users        
    });
}

// module.exports.actionName = function(req, res){}