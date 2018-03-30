const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const Posts = require('mongoose').model('Posts');
const _ = require('lodash');

const config = require('../../config');


const router = new express.Router();

router.get('/posts', (req, res) => {
  Posts.find({}, function(err, posts) {
    res.status(200).json({
      success: true,
      posts: posts,
    });
  });
});


router.get('/post/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id, function(err, post) {
    if(post) {
      res.status(200).json({
        success: true,
        posts: [post],
      });
    } else {
      res.status(400).json({
        success: false
      });
    }
  });
});


router.delete('/post/:id', (req, res) => {
  const { id } = req.params;
  Posts.remove({_id: id}, function(err) {
    if(err) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  });
});


router.put('/post/edit/:id', (req, res) => {
  const { id } = req.params;
  const errors = {};

  if(_.isEmpty(req.body.title)) {
    errors.title = "Field can not be empty";
  }
  if(_.isEmpty(req.body.text)) {
    errors.text = "Field can not be empty"; 
  }
  if(!_.isEmpty(errors)) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  Posts.update({ _id: id }, req.body, function(err) {
    if(err) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  });
});


router.post('/posts/add', (req, res) => {
  const errors = {};
  const {title, text} = req.body;
  if(_.isEmpty(title)) {
    errors.title = "Field can not be empty";
  }
  if(_.isEmpty(text)) {
    errors.text = "Field can not be empty"; 
  }
  if(!_.isEmpty(errors)) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    const userId = decoded.sub;
    User.findById(userId, (userErr, user) => {
      const userName = user.name;
      const post = new Posts({ publisherId: userId, publisherName: userName, title: title, text: text });
      post.save();
      res.status(200).json({
        success: true
      });
    });
  });
});


module.exports = router;
