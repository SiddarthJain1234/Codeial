const passport = require('../config/passport-local-strategy');
const User = require('../models/user');

module.exports.profile =async function(req, res){
  
    let user=await User.findById(req.params.id).populate({
        path:'posts'
    });
     let posts=user.posts;
   
   for(let i=0; i<posts.length; i++){
    let ut=await User.findById(posts[i].user);
    posts[i].user=ut;
    
   }
   

        return res.render('user_profile', {
            title: 'User Profile',
            u: user,
            posts:posts
        })
     
    
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

   
    User.findOne({email:req.body.email}).then((user)=>{
        
        if (!user){
            User.create({name:req.body.name,email:req.body.email,password:req.body.password}) .then(result => {
                req.flash('success','User successfully created!');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }


    }).catch((err)=>{
        console.log("error in finding user in signing up ");
        return;
      

    })

}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // passport.setAuthenticatedUser();
    req.flash('success','you have successfully logged in!');
    User.findOne({email:req.body.email}).then((user)=>{       
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back')
            }
            else{
                
                return res.redirect('/users/profile/'+user.id);
            }
        }
        else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log("error in finding user ");
        return;
    })



}





module.exports.logout=function(req,res){
    res.clearCookie('connect.sid');
    
     //req.flash('success','you have successfully logged out!');
    
    
    return res.redirect('/');
}

module.exports.editprofile=async function(req, res){
    
    const {id} = req.params;  
    let u= await User.findById(id);

    res.render('update_profile',{user:u,title:'Update Profile'});

}

module.exports.updateProfile=async function(req, res){
    const {id} = req.params; 
    
    await User.findByIdAndUpdate(id,{name:req.body.name,email:req.body.email});
    
    req.flash('success','user details updated!');

    res.redirect('/users/profile/'+id);
}