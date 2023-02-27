const route = require("express").Router();
const { Career } = require("../model/model");
const { setResponse } = require("./myFuncs");
const ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/authorization");

route.get("/", async (req, res) => {
  try {
    const response = await Career.find({});
    return setResponse(res, null, response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  try {
    const response = await Career.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!response) return setResponse(res, "Job not found", null, 404);
    return setResponse(res, null, response);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/", auth, async (req, res) => {
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.positions)
    return setResponse(res, "Positions field is required", null, 405);
  if (!req.body.department)
    return setResponse(res, "Department field is required", null, 405);
  if (!req.body.city)
    return setResponse(res, "City field is required", null, 405);
  if (!req.body.summary)
    return setResponse(res, "Summary field is required", null, 405);
  if (!req.body.experience)
    return setResponse(res, "Experience field is required", null, 405);
  if (!req.body.qualification)
    return setResponse(res, "Qualification field is required", null, 405);
  if (!req.body.technologies)
    return setResponse(res, "Technologies field is required", null, 405);
  if (!req.body.responsibilities)
    return setResponse(res, "Responsibilities field is required", null, 405);
  try {
    const title = req.body.title;
    const positions = req.body.positions;
    const department = req.body.department;
    const city = req.body.city;
    const summary = req.body.summary;
    const experience = req.body.experience;
    const qualification = req.body.qualification;
    const technologies = req.body.technologies;
    const responsibilities = req.body.responsibilities;
    const newCareer = new Career({
      title,
      positions,
      department,
      city,
      summary,
      experience,
      qualification,
      technologies,
      responsibilities,
      status: true,
    });
    const response = await newCareer.save();
    return setResponse(res, "Job Created", response, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return setResponse(res, "Invalid ID", null, 405);
  if (!req.body.title)
    return setResponse(res, "Title field is required", null, 405);
  if (!req.body.positions)
    return setResponse(res, "Positions field is required", null, 405);
  if (!req.body.department)
    return setResponse(res, "Department field is required", null, 405);
  if (!req.body.city)
    return setResponse(res, "City field is required", null, 405);
  if (!req.body.summary)
    return setResponse(res, "Summary field is required", null, 405);
  if (!req.body.experience)
    return setResponse(res, "Experience field is required", null, 405);
  if (!req.body.qualification)
    return setResponse(res, "Qualification field is required", null, 405);
  if (!req.body.technologies)
    return setResponse(res, "Technologies field is required", null, 405);
  if (!req.body.responsibilities)
    return setResponse(res, "Responsibilities field is required", null, 405);
  try {
    const title = req.body.title;
    const myBody = { title };
    const response = await Career.updateOne(
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
    const response = await Career.deleteOne({
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
