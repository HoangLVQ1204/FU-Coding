var express = require('express');
var router = express.Router();


router.get('/ask', function(req, res) {
    res.render('post-question.html');
});

router.post('/ask', function(req, res) {    
    res.json(req.body);
});

module.exports = router;