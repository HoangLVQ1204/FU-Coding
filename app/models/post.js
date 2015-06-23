var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    title: String,
    slug : String,
    picture : String,
    teaser : String,
    content: String,
    author : String,
    time : Date,
    tags: [],
    likes: Number,
    comments: [],
});

module.exports = mongoose.model('Post',postSchema);