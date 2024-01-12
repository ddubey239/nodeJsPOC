const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this note"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Note", noteSchema);
