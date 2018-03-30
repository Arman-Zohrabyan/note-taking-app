const mongoose = require('mongoose');

// define the Post model schema
const PostsSchema = new mongoose.Schema({
  publisherId: String,
  publisherName: String,
  title: String,
  text: String,
  image: {
    type: String,
    default: "/lorem.jpg",
  }
});

module.exports = mongoose.model('Posts', PostsSchema);
