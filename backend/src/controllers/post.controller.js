import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

export async function createPost(req, res, next) {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content are required." });

    const post = await Post.create({ title, content, author: req.user._id });
    return res.status(201).json({ message: "Post created successfully.", post });
  } catch (error) {
    next(error);
  }
}

export async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
    return res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    next(error);
  }
}

export async function getPostById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post ID." });
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post not found." });
    return res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post ID." });
    const { title, content } = req.body;
    if (!title && !content) return res.status(400).json({ message: "Provide a title or content to update." });

    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ message: "Post not found or you do not own it." });
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    await post.save();
    return res.status(200).json({ message: "Post updated successfully.", post });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid post ID." });
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ message: "Post not found or you do not own it." });
    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    next(error);
  }
}
