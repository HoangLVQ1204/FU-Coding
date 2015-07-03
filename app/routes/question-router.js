var express = require('express');
var router = express.Router();
var getSanitizingConverter = require("../../public/js/Markdown.Sanitizer").getSanitizingConverter,
	saneConv = getSanitizingConverter();

var Post = require('../models/post.js');

router.get('/ask', function(req, res) {
    res.render('post-question.html');
});

router.post('/ask', function(req, res) {
	// res.set('Content-Type', 'text/html; charset=utf-8');
 //    res.write(JSON.stringify(req.body));
 //    res.write("\nMARKDOWN\n");
 //    res.write(saneConv.makeHtml(req.body.content));
 //    res.end();

 	var title = req.body.title;
 	var content = saneConv.makeHtml(req.body.content);
 	var tags = req.body.tags.split(',');
 	console.log("Input tags = ", tags);
 	Post.create({title: title, content: content, tags: tags}, function (err, small) {
 		res.set('Content-Type', 'text/html; charset=utf-8');
 		if (err) {
 			res.end("Hic hic: " + err);
 		} else {
 			res.redirect('/question/' + small._id);
 		}
 	})
});

router.get('/all', function(req, res) {
	Post.find({}, function(err, result) {
		if (err) {
			res.end("Hic hic: " + err);
		} else {
			result.sort({'time': 'desc'});
			res.render('list-questions.html', {questions: result});
		}
	})
});

router.get('/:id', function (req, res) {
	// res.write("Read " + req.params.id);
	// res.end(typeof req.params.id);
	Post.findById(req.params.id, 'title content tags time', function(err, question) {
		res.render('question.html', {question: question});
	})
});

module.exports = router;