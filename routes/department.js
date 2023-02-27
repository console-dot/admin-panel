const route = require("express").Router();
const { Department } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Department.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Department.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Department not found", null, 404);
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
    const newDepartment = new Department({
      title,
    });
    const response = await newDepartment.save();
    return setResponse(res, "Department Added", response, 200);
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
    const response = await Department.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Department Updated", response, 200);
    return setResponse(res, "Department not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Department.deleteOne({
      _id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Department Deleted", response, 200);
    return setResponse(res, "Department not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
