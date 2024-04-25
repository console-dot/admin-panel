const { Schema, model } = require("mongoose");

const file = Schema({
  mimetype: String,
  data: Buffer,
  name: String,
});

const FileModel = model("File", file);
module.exports = { FileModel };