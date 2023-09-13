const passport=require('passport')
const LocalStrategy = require('passport-local');

const User=require('../models/user')

passport.use(new LocalStrategy({
  usernameField:'email',
  passReqToCallback:true
},
function verify(req,username,password,done){
  //find a user and estabilish a identity
  User.findOne({email:username})
  .then((doc)=>{
      if(doc.password!= password){
          req.flash('error','password/username is wrong');
          return done(null, false);
      }
      return done(null, doc);
  })
  .catch((err)=>{req.flash('error','password/username is wrong'); return done(null,false);})

}
));
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });


passport.serializeUser(function(user, cb) {
    
    return  cb(null, user);
});







passport.deserializeUser( function(user, cb) {
    
     return cb(null, user);
  });



// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()){
      return next();
  }

  // if the user is not signed in
  return res.redirect('/y');
}

passport.setAuthenticatedUser = function(req, res, next){
  if (req.isAuthenticated()){
      // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
     
      res.locals.user = req.user;
  }

  next();
}

passport.checkLoggedIn=function(req,res,next){
  if (req.isAuthenticated()){
   
  res.redirect('back');   
}
else{
  next();
}
}














module.exports=passport;