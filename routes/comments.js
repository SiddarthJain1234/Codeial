const express = require('express');
const router = express.Router();
const passport=require('../config/passport-local-strategy')

const commentController=require('../controllers/comments_controller');

router.get('/showcomments/:id',commentController.showcomments);
router.post('/docomment',commentController.docomment)

router.get('/destroy/:id',passport.checkAuthentication,commentController.deletecomment);

module.exports=router;