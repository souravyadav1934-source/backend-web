import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", requireAuth, createPost);
router.patch("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);
export default router;
