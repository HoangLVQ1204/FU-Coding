var Post = require('../models/post');
var express = require('express');
var router = express.Router();

router.get('/list',function(req,res){
         var posts = Post.find({},function(err,result){
            result = result.sort({'time' : 'desc'});
            res.render('admin/post/listposts.html',{posts:result, message: req.flash('info')});
         });
});

router.get('/addnew',function(req,res){
		res.render('admin/post/addnewpost.html');
});


module.exports = router;