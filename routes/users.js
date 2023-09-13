const express = require('express');
const router = express.Router();
const passport=require('../config/passport-local-strategy')
const usersController = require('../controllers/users_controller');

const User = require('../models/user')





router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.get('/sign-up', passport.checkLoggedIn,usersController.signUp);
router.get('/sign-in',passport.checkLoggedIn, usersController.signIn);
router.post('/create-session',passport.authenticate('local', { failureRedirect: '/users/sign-in' }),usersController.createSession);
router.get('/log-out',usersController.logout);
router.post('/create', usersController.create);
router.get('/edit-profile/:id',passport.checkAuthentication,usersController.editprofile);
router.post('/update-profile/:id',passport.checkAuthentication,usersController.updateProfile );
module.exports = router;