const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport=require('./config/passport-local-strategy')
var session = require('express-session');
var flash = require('connect-flash');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(session({
  secret: 'false',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use(express.static('./assets'));
app.use(expressLayouts);






// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(flash());

app.use((req,res,next)=>{

  res.locals.flash ={
    success:req.flash('success'),
    error:req.flash('error')
  }
  next();
})
// use express router
app.use('/', require('./routes'));
app.use('/post',require('./routes/post'))
app.use('/comments',require('./routes/comments'))

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
