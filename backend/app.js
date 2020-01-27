const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.API_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Remote MongoDB');
    })
    .catch(() => {
        console.log('Failed Connection');
    });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {

        res.status(201).json({
            message: 'app.js http post method',
            postId: result._id
        });
    });;
    //console.log(post, "from app.js");
});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "Udate successful" });
    });
});

app.get('/api/posts',(req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
    });

});

app.get("/api/posts/:id", (req, res, next) => {
    //console.log(req.params.id);
    Post.findById(req.params.id).then(result => {
        //console.log(result);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: 'Post not found'});
        }
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    //console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        //console.log(result);
        res.status(200).json({message: 'Post deleted'});
    });
});

module.exports = app;