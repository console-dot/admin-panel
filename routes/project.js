const route = require("express").Router();
const { Project } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Project.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Project.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Project not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.customer_id)
    return setResponse(res, "Customer field is required", null, 405);
  if (!ObjectId.isValid(req.body.customer_id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.start_date)
    return setResponse(res, "Start Date is required", null, 405);
  if (!req.body.end_date)
    return setResponse(res, "End Date is required", null, 405);
  if (!req.body.hero)
    return setResponse(res, "Hero field is required", null, 405);
  if (!ObjectId.isValid(req.body.hero))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const customer_id = req.body.customer_id;
    const title = req.body.title;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const hero = req.body.hero;
    const newProject = new Project({
      customer_id,
      title,
      start_date,
      end_date,
      hero,
    });
    const response = await newProject.save();
    return setResponse(res, "Project Added", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.customer_id)
    return setResponse(res, "Customer field is required", null, 405);
  if (!ObjectId.isValid(req.body.customer_id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.start_date)
    return setResponse(res, "Start Date is required", null, 405);
  if (!req.body.end_date)
    return setResponse(res, "End Date is required", null, 405);
  if (!req.body.hero)
    return setResponse(res, "Hero field is required", null, 405);
  if (!ObjectId.isValid(req.body.hero))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const customer_id = req.body.customer_id;
    const title = req.body.title;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const hero = req.body.hero;
    const myBody = {
      customer_id,
      title,
      start_date,
      end_date,
      hero,
    };
    const response = await Project.updateOne(
      { _id: req.params.id },
      { $set: myBody }
    );
    if (response.modifiedCount === 1)
      return setResponse(res, "Project Updated", response, 200);
    return setResponse(res, "Project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Project.deleteOne({
      _id: req.params.id,
    });
    if (response.deletedCount === 1)
      return setResponse(res, "Project Deleted", response, 200);
    return setResponse(res, "Project not found", response, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
