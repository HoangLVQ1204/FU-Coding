var express = require('express');
var router = express.Router();


router.get('/ask', function(req, res) {
    res.render('post-question.html');
});


module.exports = router;