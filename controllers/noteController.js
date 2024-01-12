const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const ObjectId = require("mongoose").Types.ObjectId;

//@desc Get all notes
//@route GET /notes
//@access public
exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

//@desc Create a new note
//@route POST /notes
//@access public
exports.createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("title is a mandatory field");
  }
  const note = await Note.create({
    title,
    description,
  });
  res.status(201).json(note);
});

//@desc Get a note
//@route GET /notes/:id
//@access public
exports.getNote = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid id provided");
  }
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json(note);
});

//@desc Update a note
//@route PUT /notes/:id
//@access public
exports.updateNote = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid id provided");
  }
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedNote);
});

//@desc Delete a note
//@route DELETE /notes/:id
//@access public
exports.deleteNote = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid id provided");
  }
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  await Note.deleteOne({ _id: req.params.id });
  res.status(201).json({ message: `Delete note for ${req.params.id}` });
});
