const mongoose = require ('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());

app.get('/home', (req, res) => {
    res.send('Personal Journal Entry!');
});   

const consoleDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to mongoDB successfully');
};


const Post = require("../models/post.models");


exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const entry = await Entry.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.json(posts);
};


exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};


exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();

  res.json(post);
};


exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};

