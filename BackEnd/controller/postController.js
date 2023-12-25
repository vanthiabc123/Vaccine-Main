const Post = require("../models/post");

const addPost = async (req, res) => {
  const image = req.file.path;
  console.log(image);
  console.log(req.body);
  const { title, content, author, categoryPostId } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author,
      image,
      categoryPostId,
    });
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find().populate("categoryPostId");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("categoryPostId");
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, content, categoryPostId, author } = req.body;
    const image = req.file.path;
    const post = await Post.findByIdAndUpdate(id, {
      title,
      content,
      categoryPostId,
      author,
      image,
    });
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete post successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
