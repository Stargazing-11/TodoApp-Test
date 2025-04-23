const express = require("express");
const multer = require("multer");
const path = require("path");
const Todo = require("../models/Todo");
const auth = require("../middlewares/auth");

const router = express.Router();

// Storage config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create
router.post(
  "/",
  auth,
  upload.fields([{ name: "thumbnail" }, { name: "attachment" }]),
  async (req, res) => {
    const { title, description, tags } = req.body;
    const thumbnail = req.files["thumbnail"]?.[0]?.path;
    const attachment = req.files["attachment"]?.[0]?.path;

    try {
      const todo = new Todo({
        title,
        description,
        tags: tags ? tags.split(",") : [],
        thumbnail,
        attachment,
        owner: req.user.id,
      });
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

// Read all (with search/tags/pagination)
router.get("/", auth, async (req, res) => {
  const { search, tags, page = 1, limit = 10 } = req.query;
  const query = { owner: req.user.id };

  if (search) query.title = { $regex: search, $options: "i" };
  if (tags) query.tags = { $all: tags.split(",") };

  try {
    const todos = await Todo.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Read one
router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, owner: req.user.id });
    if (!todo) return res.status(404).json({ msg: "Not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update
router.put(
  "/:id",
  auth,
  upload.fields([{ name: "thumbnail" }, { name: "attachment" }]),
  async (req, res) => {
    const { title, description, tags } = req.body;
    const updateData = {
      title,
      description,
      tags: tags ? tags.split(",") : [],
    };

    if (req.files["thumbnail"])
      updateData.thumbnail = req.files["thumbnail"][0].path;
    if (req.files["attachment"])
      updateData.attachment = req.files["attachment"][0].path;

    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        updateData,
        { new: true }
      );
      if (!todo) return res.status(404).json({ msg: "Not found" });
      res.json(todo);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!todo) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
