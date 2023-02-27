const route = require("express").Router();
const { Technology_Category } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Technology_Category.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Technology_Category.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Category not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  try {
    const title = req.body.title;
    const newTechnology_Category = new Technology_Category({
      title,
    });
    const response = await newTechnology_Category.save();
    return setResponse(res, "Category Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  try {
    const title = req.body.title;
    const myBody = { title };
    const response = await Technology_Category.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Category Updated", response, 200);
    return setResponse(res, "Category not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Technology_Category.deleteOne({
      _id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Category Deleted", response, 200);
    return setResponse(res, "Category not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
