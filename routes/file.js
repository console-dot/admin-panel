const route = require("express").Router();
const { File } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await File.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await File.findOne({ _id: ObjectId(req.params.id) });
    if (!response) return setResponse(res, "File not found", null, 404);
    res.contentType(response.extension);
    res.status(200).send(response.file_code);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.files) return setResponse(res, "File not provided", null, 405);
  try {
    const file_code = req.files.myFile.data;
    const extension = req.files.myFile.mimetype;
    const newFile = new File({
      file_code,
      extension,
    });
    const response = await newFile.save();
    return setResponse(res, "File Uploaded", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await File.deleteOne({ _id: req.params.id });
    if (response.deletedCount === 1)
      return setResponse(res, "File Deleted", response, 200);
    return setResponse(res, "File not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
