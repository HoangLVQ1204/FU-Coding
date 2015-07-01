var express = require('express');
var router = express.Router();
var getSanitizingConverter = require("../../public/js/Markdown.Sanitizer").getSanitizingConverter,
	saneConv = getSanitizingConverter();


router.get('/ask', function(req, res) {
    res.render('post-question.html');
});

router.post('/ask', function(req, res) {    
    res.write(JSON.stringify(req.body));
    res.write("\nMARKDOWN\n");
    res.write(saneConv.makeHtml(req.body.content));
    res.end();
});

module.exports = router;