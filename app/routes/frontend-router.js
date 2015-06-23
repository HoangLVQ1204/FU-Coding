var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
		res.render('login.html');
});

router.get('/home',function(req,res){
		res.render('home.html');
});

module.exports = router;